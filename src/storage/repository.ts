const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/health`
);

const data = await response.json();
console.log(data);