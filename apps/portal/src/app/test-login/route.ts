import { login } from '../login/actions'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    
    await login(formData);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.message === 'NEXT_REDIRECT' || error?.digest?.startsWith('NEXT_REDIRECT')) {
      return NextResponse.json({ redirected: true, digest: error.digest });
    }
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
