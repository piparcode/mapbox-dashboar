import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react';
import Cookies from 'js-cookie';

export default function AuthUser() {
    let [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async ({ username, password }) => {        
        const identifier = username;
        try {
            const response = await fetch('https://cristian-avendano-app.onrender.com/api/auth/local', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password })
            });
    
    
            if (!response.ok) {
                throw new Error(response.statusText);
            }
    
            const data = await response.json();
            Cookies.set('token', data.jwt, { expires: 1 });
            Cookies.set('adminUser', data.user.username, { expires: 1 });
            setUser(data.user);
            window.location.reload();
        } catch (error) {
            setIsOpen(true)
        }
        
    };

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('adminUser');
        setUser(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login({ username, password });
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-4 font-public'>
                <div className='flex gap-2 justify-between'>
                    <label className='font-bold text-lg'>
                        Usuario:
                    </label>
                    <input className='rounded-lg outline-none text-black px-2' type="email" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='flex gap-2 justify-between'>
                    <label className='font-bold text-lg'>
                    Contraseña:
                    </label>
                    <input className='rounded-lg outline-none text-black px-2' type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='w-full border rounded-lg p-2 group justify-center border-gray-200 inline-flex items-center hover:text-[#ecf387] hover:border-[#ecf387]' type="submit">Iniciar sesion</button>
            </form>

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

        
    );
};

