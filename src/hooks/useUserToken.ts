import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";

export const useUserToken =()=> {
  const searchParams = useSearchParams();
  const userTokenParam = searchParams.get('token');
  const userTokenCookie = Cookies.get('accessToken'); // stored on a previous visit
  const tokenExpiration = searchParams.get('tokenExpiration');
  const pathname = usePathname();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(userTokenCookie);

  useEffect(()=> {
    if (userTokenParam || userTokenCookie){
      if (userTokenParam && tokenExpiration){ // a fresh login, update the cookies wit the new token
        Cookies.set(
          'accessToken',
          userTokenParam,
          {expires: new Date(tokenExpiration)}
        )
        setAccessToken(userTokenParam)
        router.replace(pathname)// to remove the search params
      }
    } else {
      router.replace(process.env.NEXT_PUBLIC_AUTH_PLATFORM_URL as string)
    }

  }, [pathname, router, tokenExpiration, userTokenCookie, userTokenParam])

  return accessToken;
}

