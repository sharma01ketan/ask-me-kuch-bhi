import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export {default} from 'next-auth/middleware'

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
};
export async function middleware(request: NextRequest){
  const token = await getToken({req: request})
  const url = request.nextUrl
  if(token && 
    (url.pathname.startsWith('/sign-in') ||
    url.pathname.startsWith('/sign-up') ||
    url.pathname.startsWith('/verify')  ||
    url.pathname.startsWith('/')
  )
  ){
    console.log("first ", url.pathname)
    return NextResponse.redirect(new URL('/dashboard',request.url))
  }
  if(!token && url.pathname.startsWith('/dashboard')){
        console.log("second ", url.pathname)
    return NextResponse.redirect(new URL('/sign-in',request.url))
  }
      console.log("third ", url.pathname)
  return NextResponse.next()
}

