# AI Student Dropout Prevention Platform

![App Preview](https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=300&fit=crop&auto=format)

A comprehensive AI-powered system for predicting student dropout risk and providing intelligent intervention recommendations to support student retention.

## Features

- 🤖 **ML-Based Dropout Risk Prediction**: Integrates with trained AI model for accurate risk assessment
- 👨‍🏫 **Teacher Dashboard**: Student data entry, risk prediction, and counselor assignment
- 📊 **Risk Categories**: Low, Moderate, High, Very High dropout risk classification
- 🎯 **AI Recommendation Engine**: Generates personalized interventions across 5 categories
- 📁 **File Upload & Analysis**: Process counselor reports for context-aware suggestions
- ✅ **Approval Workflow**: Teachers review and approve AI-generated recommendations
- 👥 **Multi-Role Access**: Separate portals for teachers, students, and counselors
- 📈 **Progress Tracking**: Monitor intervention effectiveness and student outcomes

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69121764fb7423bbdde504b3&clone_repository=6912192bfb7423bbdde504d3)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> this is my project was "Ai Dropout prediction" and done with first of model train and also completed in 'counsellor login' page and we have two more page. One is 'Teacher login' and 'student login'. But now i am take the initial step of plan to complete my side work. My work in this project create a teacher login and inside the login: 1. Student data entry --> predict Risk (low, moderate, high, very high) --> Assigned to counsellor + File upload in same page. 2. in file upload next page --> AI recommendation for understanding the key words. Types of Recommendations include Academic, Financial, Emotional/Psychological, Social/Peer, and Time Management categories with automatic generation based on student data and counselor reports.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **AI/ML**: Python model integration via API
- **Authentication**: Role-based access control
- **File Handling**: Multi-part form data processing

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account and bucket
- Python environment for ML model (optional - can use API)

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching Student Data
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: students } = await cosmic.objects
  .find({ type: 'students' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating Risk Assessment
```typescript
await cosmic.objects.insertOne({
  title: `Risk Assessment - ${studentName}`,
  type: 'risk-assessments',
  metadata: {
    student: studentId,
    risk_level: 'High',
    prediction_score: 0.87,
    assigned_counselor: counselorId,
    assessment_date: new Date().toISOString()
  }
})
```

### Generating AI Recommendations
```typescript
await cosmic.objects.insertOne({
  title: `Recommendations - ${studentName}`,
  type: 'recommendations',
  metadata: {
    student: studentId,
    risk_assessment: assessmentId,
    category: 'Academic',
    recommendation_text: 'Enroll in remedial math course',
    status: 'Pending',
    approved_by_teacher: false
  }
})
```

## Cosmic CMS Integration

This application uses Cosmic to manage:

- **Students**: Student profiles with academic records
- **Teachers**: Teacher accounts with assignment capabilities
- **Counselors**: Counselor profiles for student assignment
- **Risk Assessments**: ML predictions and risk levels
- **Recommendations**: AI-generated interventions
- **Counselor Reports**: Uploaded files and analysis results
- **Interventions**: Approved actions and progress tracking

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-dropout-prevention)

Set these environment variables in your Vercel project settings:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

Configure the same environment variables in Netlify's dashboard.

---

Built with [Cosmic](https://www.cosmicjs.com?utm_source=ai-dropout-prevention&utm_medium=readme&utm_campaign=github) - The Headless CMS for modern applications

<!-- README_END -->