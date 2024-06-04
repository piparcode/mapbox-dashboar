import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
("mapbox-gl");
function Map() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const apiUrl =
      "https://cristian-avendano-app.onrender.com/api/mapas?populate[image][fields][0]=url";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        result.data.forEach((item) => {
          let linksHtml = "";
          item.attributes.links.data.forEach((link) => {
            linksHtml += `
                    <a href="${link.url}" target="_blank" >${link.name}</a>
                `;
          });
          new mapboxgl.Marker({ color: "#D4D62E" })
            .setLngLat([item.attributes.long, item.attributes.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div class="py-4 px-2 rounded-lg w-fit flex flex-col gap-4">
                    <h2 class="lg:text-xl font-semibold text-center capitalize">${item.attributes.title}</h2>
                    <p class="text-sm lg:text-md text-pretty max-w-xs text-justify line-clamp-2">${item.attributes.description}</p>
                    <div>
                        <img class="w-full h-full max-w-xs object-cover block rounded-xl mx-auto" src="${item.attributes.image.data.attributes.url}" alt=${item.attributes.title}>	
                    </div>
                </div>
            `)
            )
            .addTo(map);
        });

        
      })
      .catch((error) => console.error("Error:", error));

    mapboxgl.accessToken =
      "pk.eyJ1IjoiZGVpYnlwZW5hIiwiYSI6ImNsdzB4andkNDA1d20ybHJrZG5wN29keDAifQ.n_aXTvs3JISyyhz2tGEjkw";
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-73.1198, 7.12539],
      zoom: 13,
      pitch: 60,
      maxBounds: [
        [-73.15, 7.1],
        [-73.08, 7.15],
      ],
    });

    return () => map.remove();
  }, []);

  return (
    <div
      className="relative min-h-[80vh] cursor-grab rounded-xl"
      ref={mapContainer}
    />
  );
}

export default Map;
