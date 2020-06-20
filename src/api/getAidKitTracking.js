export default async (userId) => {
  const data = await fetch(`https://404.kbsu.ru/vkminiapps/api/v1/gettracking.php?user_id=${userId}`);
  return data.json();
};
