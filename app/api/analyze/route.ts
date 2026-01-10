import { NextRequest, NextResponse } from 'next/server'
import { generateDecisionAnalysis } from '@/lib/ai-service'
import { UserConstraints } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const constraints: UserConstraints = await request.json()
    
    // Validate required fields
    if (!constraints.project_type || !constraints.company_stage || !constraints.decision_category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const analysis = await generateDecisionAnalysis(constraints)
    
    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate analysis' },
      { status: 500 }
    )
  }
}