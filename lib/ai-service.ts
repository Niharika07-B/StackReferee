import { UserConstraints, DecisionAnalysis, TechStackOption } from '@/types'

const SYSTEM_PROMPT = `You are a senior technical decision referee with 15+ years of experience in system architecture.

Your role is to help users make informed technology stack decisions by comparing options and explaining trade-offs.

CRITICAL RULES:
- NEVER give a single "best" answer
- ALWAYS compare 2-3 real technology stacks
- ALWAYS explain what is gained and lost with each choice
- ALWAYS tailor recommendations to user constraints
- ALWAYS provide future migration paths

Your output must be valid JSON matching this exact structure:
{
  "understanding": "Brief summary of user constraints and context",
  "options": [
    {
      "name": "Stack Name",
      "technologies": ["Tech1", "Tech2", "Tech3"],
      "description": "Brief description of this stack combination",
      "cost_analysis": {
        "development_speed": 8,
        "learning_curve": 6,
        "monthly_cost_current": 50,
        "monthly_cost_10x": 500
      },
      "technical_analysis": {
        "performance": 7,
        "scalability": 8,
        "vendor_lockin": 4,
        "ecosystem_maturity": 9
      },
      "risk_analysis": {
        "migration_difficulty": 5,
        "maintenance_burden": 6,
        "technology_risk": 3
      }
    }
  ],
  "tradeoff_analysis": "Detailed comparison explaining what each option optimizes for and what it sacrifices",
  "recommendation": "Decision guidance framework without making the choice for them",
  "migration_path": "Future evolution and upgrade paths for the recommended approach"
}

Act like a neutral consultant, not an advocate for any particular technology.`

export async function generateDecisionAnalysis(constraints: UserConstraints): Promise<DecisionAnalysis> {
  // If running on client side, use API route
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(constraints),
      })
      
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Client API Error:', error)
      // Fallback to mock on client side
      return generateMockAnalysis(constraints)
    }
  }
  
  // Server-side logic
  const userPrompt = `Based on these project requirements, provide a tech stack decision analysis:

Project Type: ${constraints.project_type}
Company Stage: ${constraints.company_stage}
Monthly Budget: $${constraints.monthly_budget_usd}
Team Size: ${constraints.team_size}
Team Experience: ${constraints.team_experience.join(', ')}
Time to Market: ${constraints.time_to_market}
Expected Users: ${constraints.expected_users}
Compliance Needs: ${constraints.compliance_needs}
Decision Category: ${constraints.decision_category}

Generate 2-3 realistic tech stack options that fit these constraints. Consider both immediate needs and 12-month growth projections.

Return only valid JSON matching the specified structure.`

  try {
    // Try OpenAI first, then Gemini, then fallback to mock
    if (process.env.OPENAI_API_KEY) {
      return await callOpenAI(userPrompt)
    } else if (process.env.GEMINI_API_KEY) {
      return await callGemini(userPrompt)
    } else {
      console.log('No API keys found, using mock response')
      return generateMockAnalysis(constraints)
    }
  } catch (error) {
    console.error('AI Service Error:', error)
    console.log('Falling back to mock response')
    return generateMockAnalysis(constraints)
  }
}

async function callOpenAI(userPrompt: string): Promise<DecisionAnalysis> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`)
  }

  const data = await response.json()
  const content = data.choices[0].message.content

  try {
    return JSON.parse(content)
  } catch (parseError) {
    console.error('Failed to parse OpenAI response:', content)
    throw new Error('Invalid JSON response from OpenAI')
  }
}

async function callGemini(userPrompt: string): Promise<DecisionAnalysis> {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `${SYSTEM_PROMPT}\n\n${userPrompt}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      }
    }),
  })

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`)
  }

  const data = await response.json()
  const content = data.candidates[0].content.parts[0].text

  try {
    return JSON.parse(content)
  } catch (parseError) {
    console.error('Failed to parse Gemini response:', content)
    throw new Error('Invalid JSON response from Gemini')
  }
}

function generateMockAnalysis(constraints: UserConstraints): DecisionAnalysis {
  // Enhanced mock responses based on constraints
  const isStudentProject = constraints.company_stage === 'Student'
  const isLowBudget = constraints.monthly_budget_usd < 100
  const isAIProject = constraints.project_type === 'AI App'
  const isEcommerce = constraints.project_type === 'E-commerce'
  const isMobile = constraints.project_type === 'Mobile App'
  
  let options: TechStackOption[] = []
  
  if (isStudentProject || isLowBudget) {
    options = [
      {
        name: "Firebase + React Stack",
        technologies: ["React", "Firebase", "Vercel", "Tailwind CSS"],
        description: "Rapid prototyping with managed backend services - perfect for students and quick MVPs",
        cost_analysis: {
          development_speed: 9,
          learning_curve: 7,
          monthly_cost_current: 25,
          monthly_cost_10x: 200
        },
        technical_analysis: {
          performance: 7,
          scalability: 6,
          vendor_lockin: 8,
          ecosystem_maturity: 9
        },
        risk_analysis: {
          migration_difficulty: 7,
          maintenance_burden: 4,
          technology_risk: 3
        }
      },
      {
        name: "Supabase + Next.js Stack",
        technologies: ["Next.js", "Supabase", "PostgreSQL", "Vercel"],
        description: "Open-source Firebase alternative with SQL database and better data control",
        cost_analysis: {
          development_speed: 8,
          learning_curve: 6,
          monthly_cost_current: 30,
          monthly_cost_10x: 150
        },
        technical_analysis: {
          performance: 8,
          scalability: 7,
          vendor_lockin: 5,
          ecosystem_maturity: 7
        },
        risk_analysis: {
          migration_difficulty: 5,
          maintenance_burden: 5,
          technology_risk: 4
        }
      }
    ]
  } else if (isAIProject) {
    options = [
      {
        name: "Python + FastAPI + OpenAI",
        technologies: ["Python", "FastAPI", "OpenAI API", "PostgreSQL", "Docker", "AWS"],
        description: "AI-first stack leveraging Python's ML ecosystem with modern async API framework",
        cost_analysis: {
          development_speed: 7,
          learning_curve: 6,
          monthly_cost_current: 150,
          monthly_cost_10x: 800
        },
        technical_analysis: {
          performance: 8,
          scalability: 8,
          vendor_lockin: 4,
          ecosystem_maturity: 9
        },
        risk_analysis: {
          migration_difficulty: 4,
          maintenance_burden: 6,
          technology_risk: 3
        }
      },
      {
        name: "Node.js + Express + Gemini",
        technologies: ["Node.js", "Express", "Gemini API", "MongoDB", "Redis", "GCP"],
        description: "JavaScript-unified stack with Google's AI integration and NoSQL flexibility",
        cost_analysis: {
          development_speed: 8,
          learning_curve: 7,
          monthly_cost_current: 120,
          monthly_cost_10x: 600
        },
        technical_analysis: {
          performance: 7,
          scalability: 7,
          vendor_lockin: 5,
          ecosystem_maturity: 8
        },
        risk_analysis: {
          migration_difficulty: 5,
          maintenance_burden: 7,
          technology_risk: 4
        }
      }
    ]
  } else if (isEcommerce) {
    options = [
      {
        name: "Shopify + React",
        technologies: ["Shopify", "React", "Shopify API", "Stripe", "Vercel"],
        description: "E-commerce focused platform with built-in payments, inventory, and order management",
        cost_analysis: {
          development_speed: 9,
          learning_curve: 5,
          monthly_cost_current: 80,
          monthly_cost_10x: 300
        },
        technical_analysis: {
          performance: 8,
          scalability: 8,
          vendor_lockin: 9,
          ecosystem_maturity: 9
        },
        risk_analysis: {
          migration_difficulty: 8,
          maintenance_burden: 3,
          technology_risk: 2
        }
      },
      {
        name: "Next.js + Stripe + PostgreSQL",
        technologies: ["Next.js", "Stripe", "PostgreSQL", "Prisma", "AWS"],
        description: "Custom e-commerce solution with full control over user experience and data",
        cost_analysis: {
          development_speed: 6,
          learning_curve: 7,
          monthly_cost_current: 100,
          monthly_cost_10x: 500
        },
        technical_analysis: {
          performance: 9,
          scalability: 9,
          vendor_lockin: 3,
          ecosystem_maturity: 8
        },
        risk_analysis: {
          migration_difficulty: 4,
          maintenance_burden: 8,
          technology_risk: 3
        }
      }
    ]
  } else if (isMobile) {
    options = [
      {
        name: "React Native + Expo",
        technologies: ["React Native", "Expo", "Firebase", "TypeScript"],
        description: "Cross-platform mobile development with shared codebase and rapid deployment",
        cost_analysis: {
          development_speed: 8,
          learning_curve: 6,
          monthly_cost_current: 50,
          monthly_cost_10x: 250
        },
        technical_analysis: {
          performance: 7,
          scalability: 7,
          vendor_lockin: 4,
          ecosystem_maturity: 8
        },
        risk_analysis: {
          migration_difficulty: 6,
          maintenance_burden: 6,
          technology_risk: 4
        }
      },
      {
        name: "Flutter + Firebase",
        technologies: ["Flutter", "Dart", "Firebase", "Google Cloud"],
        description: "Google's UI toolkit for native mobile apps with excellent performance",
        cost_analysis: {
          development_speed: 7,
          learning_curve: 8,
          monthly_cost_current: 60,
          monthly_cost_10x: 300
        },
        technical_analysis: {
          performance: 9,
          scalability: 8,
          vendor_lockin: 6,
          ecosystem_maturity: 7
        },
        risk_analysis: {
          migration_difficulty: 7,
          maintenance_burden: 5,
          technology_risk: 5
        }
      }
    ]
  } else {
    // Default enterprise/scale-up options
    options = [
      {
        name: "Node.js + PostgreSQL + AWS",
        technologies: ["Node.js", "Express", "PostgreSQL", "Redis", "AWS", "Docker"],
        description: "Battle-tested enterprise stack with full control and proven scalability",
        cost_analysis: {
          development_speed: 6,
          learning_curve: 5,
          monthly_cost_current: 200,
          monthly_cost_10x: 1000
        },
        technical_analysis: {
          performance: 9,
          scalability: 9,
          vendor_lockin: 3,
          ecosystem_maturity: 10
        },
        risk_analysis: {
          migration_difficulty: 3,
          maintenance_burden: 8,
          technology_risk: 2
        }
      },
      {
        name: "Django + PostgreSQL + GCP",
        technologies: ["Python", "Django", "PostgreSQL", "Redis", "GCP", "Kubernetes"],
        description: "Python-based enterprise solution with Google Cloud's managed services",
        cost_analysis: {
          development_speed: 7,
          learning_curve: 6,
          monthly_cost_current: 180,
          monthly_cost_10x: 900
        },
        technical_analysis: {
          performance: 8,
          scalability: 9,
          vendor_lockin: 4,
          ecosystem_maturity: 9
        },
        risk_analysis: {
          migration_difficulty: 4,
          maintenance_burden: 7,
          technology_risk: 3
        }
      }
    ]
  }
  
  return {
    understanding: `Based on your ${constraints.company_stage.toLowerCase()} context with a $${constraints.monthly_budget_usd}/month budget and ${constraints.team_size} team member(s), you need a ${constraints.project_type.toLowerCase()} solution that can launch within ${constraints.time_to_market} and scale to ${constraints.expected_users} users. Your team's experience with ${constraints.team_experience.slice(0, 3).join(', ')} will influence the learning curve.`,
    options,
    tradeoff_analysis: `Each option represents different optimization priorities. The first option prioritizes ${isStudentProject || isLowBudget ? 'development speed and cost efficiency' : isAIProject ? 'AI ecosystem integration and Python tooling' : isEcommerce ? 'e-commerce features and payment processing' : isMobile ? 'cross-platform development and native performance' : 'enterprise reliability and scalability'}, making it ideal for your ${constraints.time_to_market} timeline. The second option balances ${isStudentProject || isLowBudget ? 'control with convenience' : isAIProject ? 'JavaScript familiarity with AI capabilities' : isEcommerce ? 'customization with development complexity' : isMobile ? 'performance with learning curve' : 'flexibility with operational complexity'}, offering more room for future customization. Consider your team's experience with ${constraints.team_experience.length > 0 ? constraints.team_experience.slice(0, 2).join(' and ') : 'the technologies'} when making your decision.`,
    recommendation: `Given your ${constraints.time_to_market} timeline and ${constraints.company_stage.toLowerCase()} stage, I recommend starting with the option that best matches your team's existing skills in ${constraints.team_experience.length > 0 ? constraints.team_experience[0] : 'web development'}. ${constraints.monthly_budget_usd < 100 ? 'Your budget constraints favor the more cost-effective option initially.' : constraints.monthly_budget_usd > 500 ? 'Your budget allows for more sophisticated tooling and managed services.' : 'Your moderate budget supports either approach with careful resource management.'} Focus on validating your core assumptions quickly, then evolve your stack as requirements become clearer and your ${constraints.expected_users} user target approaches.`,
    migration_path: `Start with an MVP using your chosen stack within the first month, focusing on core ${constraints.project_type.toLowerCase()} functionality. At the 3-month mark, evaluate performance metrics and user feedback to identify scaling bottlenecks. Plan for potential stack evolution at the 6-12 month mark when you have real user data and clearer long-term requirements. ${constraints.expected_users === '1M+' ? 'Given your ambitious scale targets, prepare for microservices architecture and advanced caching strategies.' : constraints.expected_users === '< 1k' ? 'Your modest scale allows for simpler architecture that can evolve gradually.' : 'Your growth trajectory suggests planning for database optimization and CDN integration by month 6.'} Each option provides natural upgrade paths to more sophisticated architectures as your ${constraints.project_type.toLowerCase()} needs grow.`
  }
}