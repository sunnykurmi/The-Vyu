import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Const } from "@/utils/Constants";
import WebPageSchema from "@/components/seo/WebPageSchema";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import SiteNavigationSchema from "@/components/seo/SiteNavigationSchema";

const SeoHeader = ({ meta }) => {
  const router = useRouter();
  const canonical = `${Const.ClientLink}/${router.asPath?.slice(1)}`;
  return (
    <Head>
      <title>{meta?.title || ""}</title>
      <meta name="description" content={meta?.description || ""} />
      <meta name="keywords" content={meta?.keywords || ""} />
      {meta?.author && <meta name="author" content={meta?.author || ""} />}
      <meta name="publisher" content={Const.Brand} />
      <meta
        name="robots"
        content={`${
          meta?.robots || "noindex,nofollow"
        }, max-image-preview:large`}
      />
      {/* <meta name="google-adsense-account" content="ca-pub-1554697474896763" /> */}
      <link rel="canonical" href={canonical} />
      {/* OG Tags */}
      {/* <meta property="fb:app_id" content="446498535209610" /> */}
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={meta?.og?.title || meta?.title || ""}
      />
      <meta
        property="og:description"
        content={meta?.og?.description || meta?.description || ""}
      />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={Const.Brand} />
      <meta
        property="og:image"
        content={
          meta?.og?.image ||
          `${Const.ClientLink}/favicon/web-app-manifest-512x512.png`
        }
      />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      {/* Twitter Tag */}
      <meta
        name="twitter:card"
        content={meta?.twitter?.card || "summary_large_image"}
      />
      <meta
        name="twitter:title"
        content={meta?.twitter?.title || meta?.title || ""}
      />
      <meta
        name="twitter:description"
        content={meta?.twitter?.description || meta?.description || ""}
      />
      <meta name="twitter:site" content={"@THEVYU_"} />
      <meta
        name="twitter:image"
        content={
          meta?.twitter?.image ||
          `${Const.ClientLink}/favicon/web-app-manifest-512x512.png`
        }
      />
      <meta name="twitter:creator" content={"@THEVYU_"} />
      <meta charset="UTF-8" />
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href={`${Const.ClientLink}/favicon.ico`} />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href={`${Const.ClientLink}/favicon/favicon-96x96.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={`${Const.ClientLink}/favicon/web-app-manifest-192x192.png`}
      />
      <link rel="shortcut icon" href={`${Const.ClientLink}/favicon.ico`} />
      <link
        rel="apple-touch-icon"
        href={`${Const.ClientLink}/favicon/apple-touch-icon.png`}
      />
      <meta name="apple-mobile-web-app-title" content={Const.Brand} />
      <link
        rel="manifest"
        href={`${Const.ClientLink}/favicon/site.webmanifest`}
      />
      <link rel="alternate" hreflang="en-in" href={canonical} />
      <WebPageSchema
        name={meta?.title || ""}
        description={meta?.description || ""}
        url={canonical}
      />
      <OrganizationSchema
        name={Const.Brand}
        clientLink={`${Const.ClientLink}/`}
        logoUrl={`${Const.ClientLink}/logo/new_vyu_logo.png`}
        address={{
          streetAddress: "",
          addressLocality: "Thane",
          addressRegion: "India",
          postalCode: "401 105",
        }}
        contact={{
          telephone: "+91–8527069067",
          contactType: "Customer Service",
          areaServed: "IN",
          availableLanguage: "English",
          hoursAvailable: {
            opens: "10:00",
            closes: "18:00",
          },
        }}
        sameAs={[
          "https://www.facebook.com/thevyu",
          "https://www.instagram.com/thevyu/",
          "https://twitter.com/thevyu_",
        ]}
      />
      <SiteNavigationSchema />
    </Head>
  );
};

export default SeoHeader;
