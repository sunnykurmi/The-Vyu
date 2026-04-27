import parse from "html-react-parser";
import { Const } from "./Constants";

export const htmlParser = (data) => {
  return parse(data);
};

export const dateFormateWithTime = (dateString) => {
  const date = new Date(dateString);

  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const minutesStr = minutes.toString().padStart(2, "0");

  return `${month} ${day}, ${year} ${hours}:${minutesStr}${ampm}`;
};
export const dateFormateWithTimeShort = (dateString) => {
  const date = new Date(dateString);

  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const minutesStr = minutes.toString().padStart(2, "0");

  return `${month} ${day}, ${year}`;
};

export const timeFormate = (date) => {
  const dateObj = new Date(date);
  const options = {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObj
  );
  const getTime = formattedDate.split(" at ")[1];
  return getTime;
};

export const formatDateAndTime = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${
    months[date.getUTCMonth()]
  } ${date.getUTCDate()}, ${date.getUTCFullYear()}`;

  const diffInMilliseconds = now - date;
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays >= 10) {
    return formattedDate;
  } else {
    let timeDifference;
    if (diffInDays === 1) {
      timeDifference = `${diffInDays} day ago`;
    } else if (diffInDays > 1) {
      timeDifference = `${diffInDays} days ago`;
    } else if (diffInHours >= 1) {
      timeDifference = `${diffInHours} hours ago`;
    } else {
      timeDifference = `${diffInMinutes} minutes ago`;
    }
    return timeDifference;
  }
};

export const formatDateTimeHv = (inputDateTime) => {
  const inputDate = new Date(inputDateTime);
  const currentDate = new Date();

  const diffTime = Math.abs(currentDate - inputDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const isSameDay =
    inputDate.getDate() === currentDate.getDate() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear();

  if (isSameDay) {
    // Ensuring consistent 12-hour format (with AM/PM) across client and server
    return inputDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  if (diffDays <= 2) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }

  // Return in "SEP 19, 2024" format for dates older than 2 days
  const options = { year: "numeric", month: "short", day: "numeric" };
  return inputDate.toLocaleDateString("en-US", options);
};

export const checkPermission = (value, viewIndex) => {
  if (value && typeof value == "number" && value > 0) {
    const permissions = Number(value)
      .toString(2)
      .split("")
      .reverse()
      .map((item) => item === "1");
    Object.keys(viewIndex).forEach(function (key, value) {
      if (permissions.length > value) {
        viewIndex[key] = permissions[value];
      } else {
        viewIndex[key] = false;
      }
    });
    return viewIndex;
  } else {
    return false;
  }
};

export const binaryToNumber = (value) => {
  if (value) {
    const binaryToNumber = parseInt(value, 2);
    return binaryToNumber;
  } else {
    return 0;
  }
};

export const permissionCount = (value) => {
  if (value && typeof value == "number" && value > 0) {
    const permissions = Number(value).toString(2).split("");
    const total = permissions.length;
    const count = permissions.filter((item) => item === "1").length;
    return { count, total };
  }
  return { count: 0, total: 0 };
};

export const isValidColor = (input) => {
  try {
    const namedColors = [
      "black",
      "silver",
      "gray",
      "white",
      "maroon",
      "red",
      "purple",
      "fuchsia",
      "green",
      "lime",
      "olive",
      "yellow",
      "navy",
      "blue",
      "teal",
      "aqua",
      // Add more color names here
    ];

    // Case-insensitive match against the list of named colors
    const colorRegex = new RegExp(`^(${namedColors.join("|")})$`, "i");
    // let regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
    let regex = new RegExp(
      /^(#?([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})|rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)|rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|0?\.\d|1(\.0)?)\)|hsl\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d),(0|100|\d{1,2})%,(0|100|\d{1,2})%\)|hsla\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d),(0|100|\d{1,2})%,(0|100|\d{1,2})%,(0?\.\d|1(\.0)?)\))$/
    );
    return regex.test(input) || colorRegex.test(input);
  } catch (error) {
    return false;
  }
};

export const ga4FormatDate = (dateString) => {
  // Extract year, month, and day from the string
  const dateStringParam = dateString.split("-");
  const year = dateStringParam[0];
  const month = parseInt(dateStringParam[1]);
  const day = dateStringParam[2];

  // Define an array for month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(year, month - 1, day);
  const monthName = monthNames[date.getMonth()];
  const formattedDay = day.padStart(2, "0");
  return monthName + " " + formattedDay;
};

export const generateSlug = (title) => {
  let slug = title
    .toString() // Convert to string
    .toLowerCase() // Convert to lowercase
    .trim() // Trim leading/trailing whitespace
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-"); // Replace multiple hyphens with a single hyphen
  // Ensure the slug starts with a slash
  if (!slug.startsWith("/")) {
    slug = `/${slug}`;
  }

  return slug;
};

export const statusLabel = (value) => {
  let label = "";
  if (value === Const.Inactive) {
    label = "Unpubilled";
  } else if (value === Const.Active) {
    label = "Published";
  } else if (value === Const.Trash) {
    label = "Trash";
  } else if (value === Const.Draft) {
    label = "Draft";
  } else if (value === Const.Scheduled) {
    label = "Scheduled";
  }
  return label;
};

export const hasHtmlTags = (str) => {
  const regex = /<\/?[a-z][\s\S]*>/i;
  return regex.test(str);
};

export const getEmbedType = (url) => {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const instagramRegex =
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|tv|reel)\/([A-Za-z0-9_-]+)/;

  const twitterRegex =
    /(?:https?:\/\/)?(?:(?:www\.|platform\.)?(?:twitter|x)\.com\/(?:(?:\w+\/status\/[0-9]+)|(?:embed\/Tweet\.html\?id=[0-9]+)))/;

  const facebookPostOrVideoRegex =
    /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:[^\/\n\s]+\/posts\/|(?:video\.php\?v=|watch\/))([0-9]+)/;

  if (youtubeRegex.test(url)) {
    return "youtube";
  } else if (instagramRegex.test(url)) {
    return "instagram";
  } else if (twitterRegex.test(url)) {
    return "twitter";
  } else if (facebookPostOrVideoRegex.test(url)) {
    return "facebook";
  }
};

export const extractTwitterId = (embedUrl) => {
  const match = embedUrl.split("id=")[1];
  return match;
};
