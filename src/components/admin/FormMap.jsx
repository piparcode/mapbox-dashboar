import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
("mapbox-gl");

export default function FormMap() {
    const mapContainer = useRef(null);
    let [isOpen, setIsOpen] = useState(false)

    const getDataMapa = async () => {
        console.log('hola');
        const response = await axios.get(
            'https://cristian-avendano-app.onrender.com/api/mapas?populate[image][fields][0]=url'
        );
        console.log(response.data.data);
    }

    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoiZGVpYnlwZW5hIiwiYSI6ImNsdzB4andkNDA1d20ybHJrZG5wN29keDAifQ.n_aXTvs3JISyyhz2tGEjkw";
        const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-73.1198, 7.12539],
        zoom: 13,
        pitch: 60,
        maxBounds: [
            [-73.5, 6.2],
            [-72.5, 7.5],
        ],
        });

        const marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([-73.1198, 7.12539])
            .addTo(map);
    
        function onDragEnd() {
            const lngLat = marker.getLngLat();
            console.log(lngLat.lng, lngLat.lat)
        }
    
        marker.on('dragend', onDragEnd);

        return () => map.remove();
    }, [])

    return (
        <>
            <div className="text-white">
                <button onClick={getDataMapa}>Obtener datos</button>

                <div className="relative min-h-[80vh] cursor-grab rounded-xl" ref={mapContainer} />
            </div>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpen(false)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                    transition='true'
                    className="w-full max-w-md rounded-xl bg-[#113444]/50 p-6 backdrop-blur-3xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                    <DialogTitle as="h3" className="text-2xl font-medium text-center text-[#ecf387]">
                        Contraseña Incorrecta
                    </DialogTitle>
                    <p className="mt-2 text-lg text-white">
                        ¡Upss! Parece que las credenciales ingresadas no son correctas. Por favor, verifica tus datos e inténtalo de nuevo.
                    </p>
                    <div className="mt-4">
                        <Button
                            className="w-full text-white border rounded-lg p-2 group justify-center border-gray-200 inline-flex items-center hover:text-[#ecf387] hover:border-[#ecf387]"
                            onClick={() => setIsOpen(false)}
                        >
                        Cerrar
                        </Button>
                    </div>
                    </DialogPanel>
                </div>
                </div>
            </Dialog>
        </>        
    )
}