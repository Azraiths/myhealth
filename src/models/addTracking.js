export default async (data) => {
  const response = await fetch('https://404.kbsu.ru/vkminiapps/api/v1/addtracking.php', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',

    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response.json();
};
