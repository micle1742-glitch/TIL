export const fetchUseres = async () => {
    const reponse = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!reponse.ok) {
        throw new Error ('데이터를 가져오는데 실패!');
    }
    return reponse.json();
}