export const configApiUrlsByCountry = {
  MY: {
    ticketAPIUrl: `${process.env['API_URL']}/api/v1/rabbit/my/tickets`,
    ticketCountryTicketsAPIUrl: `${process.env['API_URL']}/api/v1/rabbit/my/contacts/tickets`,
  },
};

export const getFileBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const getTrimedS3Url = (url) => {
  const trimedUrl = url
    ? url.replace('https://s3-ap-southeast-1.amazonaws.com/carro.co/', '')
    : url;
  return trimedUrl;
};
