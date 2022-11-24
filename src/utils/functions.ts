export const generateUsername = (val: string) =>
  `${val.slice(0, val.indexOf('@'))}-${Math.floor(
    Math.random() * 10000
  )}-${Math.floor(Math.random() * 10000)}-${Math.floor(
    Math.random() * 10000
  )}-${Math.floor(Math.random() * 10000)}`;

export const generateEmail = (val: string) =>
  `${val}-${Math.floor(Math.random() * 10000)}-${Math.floor(
    Math.random() * 10000
  )}-${Math.floor(Math.random() * 10000)}-${Math.floor(
    Math.random() * 10000
  )}@contact-book.com`;

export const getAvatar = (val1: string, val2?: string) =>
  `${val1 ? val1.charAt(0).toUpperCase() : ''}${
    val2 ? val2.charAt(0).toUpperCase() : ''
  }`;

export const formatDate = (val: string) =>
  val ? val.replaceAll('/', '-') : '';

export const formatDateB = (val: string) =>
  val ? val.replaceAll('-', '/') : '';