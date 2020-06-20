export default async (userId) => {
  const data = await fetch(`http://info.kbsu.ru:32777/api/vkminiapps/gettrackingallday.php?user_id=${userId}`);
  return data.json();
};
