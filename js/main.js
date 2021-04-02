//Key API: AIzaSyDBunJ4GXNEC3KJlpoGJO-iB--CjPv4o-s
//Key API DARKSKY: 7bbecca28cbc31d7c6739e70baa64e46
//Key API OPENWEATHERMAP: 542ffd081e67f4512b705f89d2a611b2

const submit = () => {
  const address = document.getElementById("txtAddress").value;
  getGeoCode(address).then((res) => {
    return getWeather(res.lat, res.lng);
  }).then((weather) => {
    return xuatManHinh(weather.temp, weather.description);
  });
};

//Xử lý Promise
const getGeoCode = (address,) => {
  return new Promise((resolve, reject) => {
    //Dùng superagent để call API lấy địa chỉ của người dùng nhập.
    superagent
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDBunJ4GXNEC3KJlpoGJO-iB--CjPv4o-s&address=${address}`
      )
      .end((error, res) => {
        if (error) {
          reject(error);
        }
        const { lat, lng } = res.body.results[0].geometry.location;
        const data = { lat, lng };
        resolve(data);
        //   console.log(lat, lng);
      });
  });
};

const getWeather = (lat, lng) => {
  return new Promise((resolve, reject) => {
    superagent
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&&appid=542ffd081e67f4512b705f89d2a611b2`
      )
      .end((err, res) => {
        if (err) {
          reject(error);
        }
        const { temp } = res.body.main;
        // document.getElementById("temperature").innerHTML = temp;
        const { description } = res.body.weather[0];
        const data = { temp: temp, description: description }; //Khi trùng tên thì ko cần phải viết temp: temp
        document.getElementById("summaryText").innerHTML = description;
        //   console.log(temp, description);

        resolve(data);
      })
  });
};

const xuatManHinh = ((temp, description) => {
  return new Promise((resolve, reject) => {
    document.getElementById("temperature").innerHTML = temp;
    document.getElementById("summaryText").innerHTML = description;
  })
})