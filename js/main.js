//Key API: AIzaSyDBunJ4GXNEC3KJlpoGJO-iB--CjPv4o-s
//Key API DARKSKY: 7bbecca28cbc31d7c6739e70baa64e46
//Key API OPENWEATHERMAP: 542ffd081e67f4512b705f89d2a611b2

const submit = () => {
  const address = document.getElementById("txtAddress").value;

  //Dùng superagent để call API lấy địa chỉ của người dùng nhập.
  superagent
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDBunJ4GXNEC3KJlpoGJO-iB--CjPv4o-s&address=${address}`
    )
    .end((error, res) => {
      if (error) {
        console.log(error);
        return;
      }
      const { lat, lng } = res.body.results[0].geometry.location;
      //   console.log(lat, lng);

      superagent
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&&appid=542ffd081e67f4512b705f89d2a611b2`
        )
        .end((err, res) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(res);
          const { temp } = res.body.main;
          console.log(temp);
          document.getElementById("temperature").innerHTML = temp;
          const { description } = res.body.weather[0];
          document.getElementById("summaryText").innerHTML = description;
          //   console.log(temp, description);
        });
    });
};
