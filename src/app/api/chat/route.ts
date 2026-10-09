import { NextRequest, NextResponse } from "next/server";

const systemPrompt = `
You are the personal AI assistant for Prabhu P, an Elite Full Stack Developer and LAMP Stack Specialist from Sivakasi, Tamil Nadu, India.
Prabhu works at Noxlay Cyber Tech, managing production LAMP web applications (Linux, Apache, MySQL, PHP) and generative AI integrations.

Prabhu's Key Profile:
- Current Role: Full Stack Developer at Noxlay Cyber Tech (Aug 2025 - Present)
- Skills: PHP, MySQL, JavaScript, React JS, Next.js, Linux, Apache, Python, Google Gemini API, Git, Tailwind CSS
- Notable Projects:
  1. Grocerzap.in - Full-scale grocery e-commerce shopping platform with Stripe payment
  2. Agent Platform - Enterprise workflow automation and client requests handler
  3. Smartmenu - Interactive digital dining menu system for restaurants
  4. Niranyafashions.in - Flagship apparel and boutique e-commerce web application
  5. Foodcher.com & Noxlay.com
  6. Frontend Utility Tools (Image Cropper, QR Code Generator, PDF to Image, WebP Converter)
- Education: B.E. in Computer Science and Engineering from PSN College of Engineering and Technology (Anna University)
- Certifications: AWS Academy Cloud Architecting (60 hrs), TCS iON NQT - IT (70.30% Score), CADD Expert React JS, Noxlay Full Stack & Frontend, Gradtwin ML Intern
- Contact: Email: 0xdevprabhu@gmail.com, Phone: +91 93440 95995, LinkedIn: linkedin.com/in/0xdevprabhu, GitHub: github.com/0xdevprabhu

Keep responses friendly, concise, professional, and helpful. If asked something unknown, politely direct them to contact Prabhu directly via email.
`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Hello! Ask me anything about Prabhu's skills, projects, or background! 🚀" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `${systemPrompt}\n\nUser Question: ${message}`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({ reply: replyText.trim() });
          }
        }
      } catch (geminiError) {
        console.warn("[Gemini API call failed, falling back to local assistant responder]:", geminiError);
      }
    }

    // Local Intelligent Rule-Based Fallback if API key is not present or offline
    const query = message.toLowerCase();
    let localReply = "";

    if (query.includes("skill") || query.includes("stack") || query.includes("tech")) {
      localReply = "Prabhu specializes in the LAMP stack (Linux, Apache, MySQL, PHP) along with modern frontend tools (React, Next.js, TypeScript, Tailwind CSS) and AI integration with the Gemini API!";
    } else if (query.includes("project") || query.includes("work")) {
      localReply = "Prabhu has developed real production systems including Grocerzap.in (e-commerce), Agent Platform (automation), Smartmenu (restaurant tech), and Niranyafashions.in!";
    } else if (query.includes("experience") || query.includes("job") || query.includes("noxlay")) {
      localReply = "Prabhu is currently working as a Full Stack Developer at Noxlay Cyber Tech, having previously completed traineeships and internships in Full Stack and Machine Learning.";
    } else if (query.includes("resume") || query.includes("cv") || query.includes("download")) {
      localReply = "You can download Prabhu's resume directly using the 'Download CV' button in the Hero section or view it live in the interactive resume modal!";
    } else if (query.includes("contact") || query.includes("email") || query.includes("phone")) {
      localReply = "You can reach Prabhu at 0xdevprabhu@gmail.com or call/WhatsApp +91 93440 95995.";
    } else if (query.includes("who") || query.includes("about") || query.includes("prabhu")) {
      localReply = "Prabhu P is a certified LAMP Stack Specialist & Full Stack Developer from Sivakasi, Tamil Nadu, passionate about scalable web architectures and AI integrations.";
    } else {
      localReply = `Thanks for asking! Prabhu is a Full Stack Developer skilled in LAMP, React/Next.js, and AI. For detailed inquiries or project discussions, feel free to drop a message in the contact form or email 0xdevprabhu@gmail.com!`;
    }

    return NextResponse.json({ reply: localReply });
  } catch (error: any) {
    console.error("[Chat API Error]:", error);
    return NextResponse.json({ reply: "Sorry, I had trouble processing your question. Please try again!" });
  }
}
