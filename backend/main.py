import os
import json
import logging
from typing import List, Dict, Any
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = FastAPI(
    title="StackWise API",
    description="Intelligent Developer Tech Stack Recommendation Engine powered by Gemini AI",
    version="1.0.0"
)

# Configure CORS
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
# Support comma-separated URLs in FRONTEND_URL env var
origins = [origin.strip() for origin in frontend_url.split(",")]
# Always allow localhost for local development flexibility
if "http://localhost:5173" not in origins:
    origins.append("http://localhost:5173")
if "http://localhost:3000" not in origins:
    origins.append("http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    logger.info("Gemini API key is configured.")
else:
    logger.warning("GEMINI_API_KEY environment variable is missing. Stack creation requests will fail.")

# Pydantic Schemas
class ProjectRequest(BaseModel):
    project_description: str = Field(
        ..., 
        description="Detailed description of what the user wants to build",
        example="An AI chatbot that assists developers with code search and git workflows."
    )
    project_type: str = Field(
        ...,
        description="The category of the project (e.g. Web App, Mobile App, SaaS, AI Project, etc.)",
        example="Web App"
    )
    experience_level: str = Field(
        ...,
        description="Experience level of the developers (Beginner, Intermediate, Advanced)",
        example="Intermediate"
    )
    team_size: str = Field(
        ...,
        description="Size of the team (Solo, Small Team, Large Team)",
        example="Solo"
    )
    expected_users: str = Field(
        ...,
        description="Scale of expected user base (Under 100, 1K+, 10K+, 100K+)",
        example="1K+"
    )

# Structured Output Verification Models
class FrontendRec(BaseModel):
    recommendation: str
    reason: str
    alternative: str

class BackendRec(BaseModel):
    recommendation: str
    reason: str
    alternative: str

class DatabaseRec(BaseModel):
    recommendation: str
    reason: str

class AuthRec(BaseModel):
    recommendation: str

class ApisRec(BaseModel):
    recommended_services: List[str]

class HostingRec(BaseModel):
    frontend: str
    backend: str

class DeploymentRec(BaseModel):
    cicd: str
    docker: str

class FolderStructureRec(BaseModel):
    hierarchy: str

class ArchitectureRec(BaseModel):
    explanation: str

class RoadmapRec(BaseModel):
    phase_1: str
    phase_2: str
    phase_3: str
    phase_4: str

class DifficultyRec(BaseModel):
    level: str

class TimelineRec(BaseModel):
    estimate: str

class CostRec(BaseModel):
    estimate: str

class ScalabilityRec(BaseModel):
    level: str

class WhyTheseChoicesRec(BaseModel):
    explanation: str

class ScoreRec(BaseModel):
    overall: int
    performance: int
    scalability: int
    learning_curve: int
    community_support: int
    cost: int

class StackResponse(BaseModel):
    frontend: FrontendRec
    backend: BackendRec
    database: DatabaseRec
    authentication: AuthRec
    apis_integrations: ApisRec
    hosting: HostingRec
    deployment: DeploymentRec
    folder_structure: FolderStructureRec
    architecture: ArchitectureRec
    roadmap: RoadmapRec
    difficulty: DifficultyRec
    timeline: TimelineRec
    cost: CostRec
    scalability: ScalabilityRec
    why_these_choices: WhyTheseChoicesRec
    why_not_these: List[str]
    score: ScoreRec


@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    """Health check endpoint to ensure API service is operational."""
    gemini_configured = api_key is not None and api_key != ""
    return {
        "status": "healthy",
        "gemini_configured": gemini_configured,
        "allowed_origins": origins
    }


@app.post("/generate-stack", response_model=StackResponse, status_code=status.HTTP_200_OK)
async def generate_stack(request: ProjectRequest):
    """
    Analyzes the project characteristics and retrieves the ideal 
    architecture, stack, timeline, scores, and folders.
    """
    # 1. Validation for API key presence
    current_api_key = os.getenv("GEMINI_API_KEY")
    if not current_api_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Gemini API Key is not configured on the server. Please add GEMINI_API_KEY to your environment."
        )
    
    # Initialize the Gemini Client using the current key
    client = genai.Client(api_key=current_api_key)

    # 2. Setup prompt targeting specific JSON format
    prompt = f"""
You are StackWise, a world-class CTO and software architect AI.
Your task is to recommend the perfect, highly detailed tech stack architecture for a developer's software project.

Here is the developer's project profile:
- **Project Description:** {request.project_description}
- **Project Type:** {request.project_type}
- **Developer Experience Level:** {request.experience_level}
- **Team Size:** {request.team_size}
- **Expected User Base Scale:** {request.expected_users}

Your response must be a single, complete, valid JSON object matching the JSON schema below. 
Do not include any markdown styling like ```json or ```, and do not write any additional introductory or concluding text. Return ONLY the raw JSON.

JSON Schema:
{{
  "frontend": {{
    "recommendation": "Name of recommended framework/libraries (e.g., 'React (Vite) with Tailwind CSS' or 'Next.js')",
    "reason": "Why this specific frontend is chosen based on experience: {request.experience_level}, size: {request.team_size}, and users: {request.expected_users}. Limit to 2 sentences.",
    "alternative": "A primary alternative option (e.g., Vue.js, Svelte, or Swift UI if mobile) and why it's a backup."
  }},
  "backend": {{
    "recommendation": "Name of recommended backend framework and runtime (e.g., 'FastAPI (Python)' or 'Node.js Express')",
    "reason": "Why this fits their project scope and complexity. Limit to 2 sentences.",
    "alternative": "A primary alternative backend framework and why."
  }},
  "database": {{
    "recommendation": "Name of recommended database (e.g., 'PostgreSQL' or 'MongoDB' or 'Supabase')",
    "reason": "Detailed logic of why this database matches the project's data characteristics."
  }},
  "authentication": {{
    "recommendation": "Auth solution (e.g., 'Supabase Auth' or 'Clerk' or 'Custom JWT authentication')"
  }},
  "apis_integrations": {{
    "recommended_services": [
      "Service name + exact purpose (e.g., 'Stripe for processing credit card subscription plans')",
      "Service name + exact purpose (e.g., 'Resend for custom transactional system emails')"
    ]
  }},
  "hosting": {{
    "frontend": "Detailed frontend hosting provider (e.g., Vercel, Netlify, Cloudflare Pages)",
    "backend": "Detailed backend hosting provider (e.g., Render, Railway, AWS ECS)"
  }},
  "deployment": {{
    "cicd": "CI/CD approach (e.g., 'GitHub Actions compiling and deploying on push')",
    "docker": "Docker setup advice. Detail if it is useful (e.g., 'Highly useful for containerizing FastAPI backend') or overkill (e.g., 'Not needed for simple hosting')"
  }},
  "folder_structure": {{
    "hierarchy": "A text-based, tree-like structure representation of files, using spaces or characters (e.g. root/\\n├── src/\\n│   ├── main.py\\n│   └── utils.py\\n└── README.md)"
  }},
  "architecture": {{
    "explanation": "A concise explanation of the overall architectural flow (e.g. Client-Server, microservice, 3-tier, headless) and request paths."
  }},
  "roadmap": {{
    "phase_1": "Phase 1 - Prep & Setup: Core tools, repositories, environment configurations, and initial hello world deployments",
    "phase_2": "Phase 2 - Backend & DB: Writing DB schemas, setting up CRUD routes, and configuring Auth APIs",
    "phase_3": "Phase 3 - Frontend Integration: Designing UI panels, hooks for queries, page components, and connecting frontend to backend APIs",
    "phase_4": "Phase 4 - Go-Live: End-to-end integration, performance caching, Dockerization builds, and production releases"
  }},
  "difficulty": {{
    "level": "Choose one exact string: 'Easy' or 'Medium' or 'Hard'"
  }},
  "timeline": {{
    "estimate": "Estimated weeks or months to build MVP (e.g., '3-4 weeks' or '2 months')"
  }},
  "cost": {{
    "estimate": "Free tier analysis or approximate costs (e.g., 'Free tier under 10k users, then ~$7/month for database')"
  }},
  "scalability": {{
    "level": "Choose one exact string: 'MVP' or 'Startup' or 'Production'"
  }},
  "why_these_choices": {{
    "explanation": "CTO-level rationale for the selections. Explain how the frontend, backend, and database interact to meet requirements. Mention key trade-offs."
  }},
  "why_not_these": [
    "Explain why a specific common alternative (e.g., Django, MongoDB, Next.js) was rejected for this. Format as 'Why not X? Because...'",
    "Explain why another alternative was rejected. Format as 'Why not Y? Because...'"
  ],
  "score": {{
    "overall": 90,
    "performance": 95,
    "scalability": 85,
    "learning_curve": 80,
    "community_support": 90,
    "cost": 95
  }}
}}
"""

    try:
        # 3. Call Gemini Model using the new google-genai SDK
         print("Available models:")
         for model in client.models.list():
             print(model.name)

         model_name = "gemini-flash-latest"
         logger.info(f"Invoking Gemini Model '{model_name}' for stack recommendation...")
        
         response = client.models.generate_content(
            model=model_name,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.2, # Lower temperature for structured, consistent recommendations
            )
        )

         response_text = response.text.strip()
         logger.info("Received raw response from Gemini API.")
        
        # 4. Parse the output JSON
         data = json.loads(response_text)
        
        # 5. Validate against Pydantic schema to ensure all keys are correctly formatted
         validated_response = StackResponse(**data)
         return validated_response

    except json.JSONDecodeError as jde:
        logger.error(f"Failed to parse Gemini output as JSON: {jde}. Raw text: {response_text}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="The AI model generated an invalid stack recommendation format. Please try again."
        )
    except Exception as e:
        logger.error(f"Error during stack generation process: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred during processing: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    # Local fallback execution
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
