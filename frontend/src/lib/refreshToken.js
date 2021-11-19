import axiosClient from "../axiosClient/index"
export default async ()=>{
    const reFreshToken = window.localStorage.getItem("refreshToken");
    axiosClient
      .get("/refreshToken", {
        headers: { Authorization: reFreshToken },
      })
      .then((res) => {
        const { token } = res.data;
        window.localStorage.setItem("token", token);
})
}