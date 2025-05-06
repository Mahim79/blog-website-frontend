export const getToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return { authorization: `Bearer ${token}` };
    }
    return {};
};
