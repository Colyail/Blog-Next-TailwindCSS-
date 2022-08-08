import { THEMES } from "../shared/enums";
import { useRouter } from "next/router";
import { ARTICLES_LIST } from "../../BLOG_CONSTANTS/_ARTICLES_LIST";
import { iArticle, iSEO } from "../shared/interfaces";
import { WEBSITE_NAME, WEBSITE_URL } from "../../BLOG_CONSTANTS/_BLOG_SETUP";

/**
 *
 * @param classes string
 * @returns string
 */
export const combineClasses = function (...classes: any): string {
  return classes.filter((item: any) => !!item).join(" ");
};

/**
 * Changes Dark / Light Theme
 */
export const changeTheme = (): void => {
  const lsTheme = localStorage.getItem("theme");
  localStorage.setItem(
    "theme",
    lsTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
  );

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  location.reload();
};

/**
 * Rerturns THEMES.LIGHT || THEMES.DARK or if state update method is passed it updated the state
 * @param setThemeState
 */
export const getTheme = (setThemeState?: any) => {
  const lsTheme = localStorage.getItem("theme");
  setThemeState(lsTheme ? lsTheme : THEMES.LIGHT);
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  if (setThemeState) {
    setThemeState(lsTheme ? lsTheme : THEMES.LIGHT);
  } else {
    return lsTheme ? lsTheme : THEMES.LIGHT;
  }
};

/**
 * Returns Device Type tablet , mobile, desktop
 * @returns string
 */
export const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

/**
 * Returns true if desktop
 * @returns boolean
 */
export const isDesktopDevice = (): boolean => {
  if (getDeviceType() === "desktop") {
    return true;
  } else {
    return false;
  }
};

/**
 * Returns true if mobile
 * @returns boolean
 */
export const isMobileDevice = (): boolean => {
  if (getDeviceType() === "mobile") {
    return true;
  } else {
    return false;
  }
};

/**
 * Add no scroll class to body when modal isopen
 */
export const addBodyNoScroll = (): void => {
  document.body.classList.add("no-scroll");
};

/**
 * Removes no scroll class to body when modal isopen
 */
export const removeBodyNoScroll = (): void => {
  document.body.classList.remove("no-scroll");
};

/**
 * Returns Article details from ARTICLES_LIST wrt the path
 * @returns iArticle
 */
export const getArticleDetails = (): iArticle => {
  const router = useRouter();
  const articlePath = "/pages" + router.pathname + ".tsx" ;
  return ARTICLES_LIST.filter((each) => each.path === articlePath)[0];
};

/**
 * Returns list of categories from ARTICLES_LIST
 * @returns string[]
 */
export const getCategories = (): string[] => {
  let categories: string[] = [];
  ARTICLES_LIST.forEach((each) => {
    if (each.preview.category && !categories.includes(each.preview.category)) {
      categories.push(each.preview.category);
    }
  });
  return categories;
};

/**
 * Removes /pages from article path
 * @param path
 * @returns
 */
export const transformPath = (path = ""): string => {
  return path.replace("/pages", "").replace(".tsx", "");
};

/**
 * Removes /public from images path
 * @param path
 * @returns
 */
export const transformImagePaths = (path = ""): string => {
  return path.replace("/public", "");
};

/**
 * Creates SEO Config from ArticleDetails.preview || ArticleDetails.seo ||  PAGE_SEO
 * @param PAGE_SEO : iSEO
 * @returns SEO config
 */
export const CREATE_SEO_CONFIG = (PAGE_SEO: iSEO) => {
  /**
   * We can create SEO Config from
   * ARTICLE_DETAILS or SEO object passed in article list or layout
   */
  const router = useRouter();
  const ARTICLE_DETAILS = getArticleDetails();

  // set url and path
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const LOCAL_URL = WEBSITE_URL ? WEBSITE_URL : origin;
  const LOCAL_PATH = ARTICLE_DETAILS
    ? transformPath(ARTICLE_DETAILS.path)
    : router.asPath;
  
  const description = PAGE_SEO?.description || ARTICLE_DETAILS?.preview?.shortIntro;
  
  const keywords = PAGE_SEO?.keywords || ARTICLE_DETAILS?.preview?.tags;
  const ogUrl = `${LOCAL_URL}${LOCAL_PATH}`;

  const ogImage = PAGE_SEO?.ogImage
    ? `${LOCAL_URL}${transformImagePaths(PAGE_SEO?.ogImage)}`
    : `${LOCAL_URL}${
        ARTICLE_DETAILS?.preview.thumbnail
          ? transformImagePaths(ARTICLE_DETAILS?.preview.thumbnail)
          : null
      }`;

  const twitterHandle = PAGE_SEO?.twitterHandle || "";
  const author = ARTICLE_DETAILS ? ARTICLE_DETAILS?.preview.author.name
    : PAGE_SEO?.author;

    const title = `${ ARTICLE_DETAILS ? ARTICLE_DETAILS?.preview?.articleTitle : PAGE_SEO?.title} | ${WEBSITE_NAME} ${author ? '| ' + author : null}`;

  let seo_config = {
    title: title,
    description: description,
    additionalMetaTags: [
      {
        property: "keywords",
        content: keywords,
      },
      {
        property: "og:description",
        content: description,
      },
      {
        property: "twitter:description",
        content: description,
      },
      {
        property: "al:web:url",
        content: ogUrl,
      },
    ],
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: ogUrl,
      site_name: WEBSITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      handle: twitterHandle,
      site: ogUrl,
      cardType: "summary_large_image",
    },
  };
  return seo_config;
};
