export default async (userId) => {
  const data = await fetch(`https://404.kbsu.ru/vkminiapps/api/v1/getprescription.php?user_to=${userId}`);
  return data.json();
};
