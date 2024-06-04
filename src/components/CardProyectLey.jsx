import { useState, useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

export default function MyModal({ ley }) {

  const [user, setUser] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [btnGoogle, setBtnGoogle] = useState(false);
  const [btnComment, setBtnComment] = useState(false);
  const [leyId, setLeyId] = useState('');
  const [message, setMessage] = useState('');
  const [commentUser, setCommentUser] = useState([]);
  const [likeProyectLey, setLikeProyectLey] = useState([]);
  const [dislikeProyectLey, setDislikeProyectLey] = useState([]);
  const [commentProyectLey, setCommentProyectLey] = useState([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('likeProyectLey'))) {
      setLikeProyectLey(JSON.parse(localStorage.getItem('likeProyectLey')));
    }

    if (JSON.parse(localStorage.getItem('dislikeProyectLey'))) {
      setDislikeProyectLey(JSON.parse(localStorage.getItem('dislikeProyectLey')));
    }

    if (JSON.parse(localStorage.getItem('commentProyectLey'))) {
      setCommentProyectLey(JSON.parse(localStorage.getItem('commentProyectLey')));
    }
  }, []);

  useEffect(() => {
    if (Cookies.get('tokenUser')) {
      const decoded = jwtDecode(Cookies.get('tokenUser'));
      setUser(decoded.email);
      setBtnGoogle(false)
    } 
  }, []);

  useEffect(() => {
    localStorage.setItem('likeProyectLey', JSON.stringify(likeProyectLey));
  }, [likeProyectLey]);

  useEffect(() => {
    localStorage.setItem('dislikeProyectLey', JSON.stringify(dislikeProyectLey));
  }, [dislikeProyectLey]);

  useEffect(() => {
    localStorage.setItem('commentProyectLey', JSON.stringify(commentProyectLey));
  }, [commentProyectLey]);

  const saveMessage = (e) => {
    setCommentUser(e.target.value);
  };

  const isLikeUser = (proyectId) => {
    return likeProyectLey.some(item => item.user === user && item.idProyectLey == proyectId);
  }

  const isDislikeUser = (proyectId) => {
    return dislikeProyectLey.some(item => item.user === user && item.idProyectLey == proyectId);
  }

  const isCommentser = (proyectId) => {
    return commentProyectLey.some(item => item.user === user && item.idProyectLey == proyectId);
  }

  const createdLikeUser = async (idProyectLey) => {
    if (Cookies.get('tokenUser')) {
      const decoded = jwtDecode(Cookies.get('tokenUser'));
      const user = decoded.email;
      setUser(user);
      try {
        const response = await axios.get(
          `https://cristian-avendano-app.onrender.com/api/like-proyect-leys?filters[user][$eq]=${user}&filters[proyectos_ley][$eq]=${idProyectLey}`
        );
  
        if (response.data.data.length > 0) {
          setIsOpen(true);
          setMessage('Ya has realizado el voto')
        } else {
          await axios.post(
            "https://cristian-avendano-app.onrender.com/api/like-proyect-leys",
            {
              data: {
                user,
                proyectos_ley: { connect: [{ id: idProyectLey }]}
              }
            }
          );
          setIsOpen(true);
          setMessage('Voto realizado con éxito')
          setLikeProyectLey(prevLikeProyectLey => {
            const newLikeProyectLey = [...prevLikeProyectLey, {user, idProyectLey}];
            return newLikeProyectLey;
          });
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    } else {
      setBtnGoogle(true)
      setIsOpen(true);
      setMessage('Primero debes iniciar sesion')
    }
  };

  const createdDislikeUser = async (idProyectLey) => {
    if (Cookies.get('tokenUser')) {
      const decoded = jwtDecode(Cookies.get('tokenUser'));
      const user = decoded.email;
      setUser(user);
      try {
        const response = await axios.get(
          `https://cristian-avendano-app.onrender.com/api/dislikes?filters[user][$eq]=${user}&filters[proyectos_ley][$eq]=${idProyectLey}`
        );
  
        if (response.data.data.length > 0) {
          setIsOpen(true);
          setMessage('Ya has realizado el voto')
        } else {
          await axios.post(
            "https://cristian-avendano-app.onrender.com/api/dislikes",
            {
              data: {
                user,
                proyectos_ley: { connect: [{ id: idProyectLey }]}
              }
            }
          );
          setIsOpen(true);
          setMessage('Voto realizado con éxito')
          setDislikeProyectLey(prevDislikeProyectLey => {
            const newDislikeProyectLey = [...prevDislikeProyectLey, {user, idProyectLey}];
            return newDislikeProyectLey;
          });
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    } else {
      setBtnGoogle(true)
      setIsOpen(true);
      setMessage('Primero debes iniciar sesion')
    }
  };

  const createdCommentUser = async (idProyectLey, comment) => {
    if (Cookies.get('tokenUser')) {
      const decoded = jwtDecode(Cookies.get('tokenUser'));
      const user = decoded.email;
      setUser(user);
      try {
        const response = await axios.get(
          `https://cristian-avendano-app.onrender.com/api/comment-proyect-leys?filters[user][$eq]=${user}&filters[proyectos_ley][$eq]=${idProyectLey}`
        );
  
        if (response.data.data.length > 0) {
          setBtnComment(false)
          setIsOpen(true);
          setMessage('Ya has realizado un comentario')
        } else {
          await axios.post(
            "https://cristian-avendano-app.onrender.com/api/comment-proyect-leys",
            {
              data: {
                user,
                comment,
                proyectos_ley: { connect: [{ id: idProyectLey }]}
              }
            }
          );
          setBtnComment(false)
          setIsOpen(true);
          setMessage('Comentario realizado con éxito')
          setCommentProyectLey(prevCommentProyectLey => {
            const newCommentProyectLey = [...prevCommentProyectLey, {user, idProyectLey}];
            return newCommentProyectLey;
          });
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    } else {
      setBtnGoogle(true)
      setIsOpen(true);
      setMessage('Primero debes iniciar sesion')
    }
  };

  return (
    <>
      {ley.map((ley) => (
        <div key={ley.id} className="md:w-1/2 md:max-w-sm relative">
          <div className="flex flex-col h-full border-2 border-gray-200 bg-[#07161d] border-opacity-60 rounded-lg overflow-hidden">
            <img
              src={ley.attributes.image.data.attributes.url}
              alt={ley.attributes.title}
              className="h-auto w-full object-cover"
            />
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
              <a
                href={ley.attributes.link_ley}
                title={ley.attributes.title}
                target="_blank"
              >
                <h2 className="text-xl mb-2">{ley.attributes.title}</h2>
              </a>
              <p className="mb-3 font-public line-clamp-3">{ley.attributes.description}</p>
              </div>
              <div>
                <div className="flex gap-2 flex-col items-center">
                 <div className='flex flex-col gap-2 w-full'>
                 <button
                    disabled={isLikeUser(ley.id) || isDislikeUser(ley.id)}
                    onClick={() => createdLikeUser(ley.id)}
                    type="button"
                    title="Me gusta"
                    className={ `${isLikeUser(ley.id) ? 'btnLike' : ''} border rounded-lg p-2 justify-center group border-gray-200 flex items-center transition md:mb-2 lg:mb-0 hover:text-[#D3D62F] hover:border-[#D3D62F]`}
                  >
                    Me gusta
                    <svg
                      className="ml-2 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      calss="icon icon-tabler icons-tabler-outline icon-tabler-heart"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                    </svg>
                  </button>
                  <button
                    disabled={isLikeUser(ley.id) || isDislikeUser(ley.id)}
                    onClick={() => createdDislikeUser(ley.id)}
                    type="button"
                    title="No me gusta"
                    className={`${isDislikeUser(ley.id) ? 'btnDislike' : ''} border rounded-lg p-2 group justify-center border-gray-200 inline-flex items-center transition md:mb-2 lg:mb-0 hover:text-red-400 hover:border-red-400`}
                  >
                    No me gusta
                    <svg
                      className="ml-2 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      calss="icon icon-tabler icons-tabler-outline icon-tabler-thumb-down"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
                    </svg>
                  </button>
                 </div>
                  <button
                    disabled={isCommentser(ley.id)}
                    onClick={() => {
                      setBtnComment(true)
                      setMessage('Deja tu comentario')
                      setIsOpen(true)
                      setLeyId(ley.id)
                    }}
                    type="button"
                    title="Comentar"
                    className={`${isCommentser(ley.id) ? 'btnComment' : ''} w-full border rounded-lg p-2 group justify-center border-gray-200 inline-flex items-center transition md:mb-2 lg:mb-0 hover:text-[#ecf387] hover:border-[#ecf387]`}
                  >
                    Comentar
                    <svg
                      className="ml-2 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      calss="icon icon-tabler icons-tabler-outline icon-tabler-message-circle"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 left-1/2 capitalize bg-[#abad27] text-lg py-1 px-3  -translate-y-1/2 rounded-lg -translate-x-1/2">
            {ley.attributes.status}
          </div>
        </div>
      ))}

      <Dialog open={isOpen} onClose={() => setIsOpen(true)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-[#091a22a6] backdrop-blur-sm">
          <DialogPanel className="max-w-lg space-y-4 flex flex-col items-center border bg-white p-12 rounded-lg ">
            <DialogTitle className="text-2xl capitalize">{message}</DialogTitle>
            {btnGoogle ? 
              <GoogleOAuthProvider clientId="664207665964-6kase8ota801aa54d71m56n0mbeqbs58.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    Cookies.set('tokenUser', credentialResponse?.credential, { expires: 30 });            
                    setIsOpen(false)
                    setBtnGoogle(false)
                    setMessage('Se inició sesión correctamente')
                    setIsOpen(true)
                    window.location.reload();
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>  
            : ''}
            {btnComment ? 
              <textarea value={commentUser} onChange={saveMessage} maxLength={1000} minLength={10} required className="w-full font-public min-w-60 min-h-48 rounded-lg border border-gray-300 h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
              : ''
            }

            <div className='flex gap-2'>
              {btnComment ? 
                <div className="px-4 py-2 border rounded-lg p-2 group justify-center border-gray-300 transition md:mb-2 lg:mb-0 hover:text-[#427288] hover:border-[#427288]">
                  <button onClick={() => createdCommentUser(leyId, commentUser)}>Enviar</button>
                </div>
                : ''
              }
              <div className="px-4 py-2 border rounded-lg p-2 group justify-center border-gray-300 transition md:mb-2 lg:mb-0 hover:text-[#427288] hover:border-[#427288]">
                <button onClick={() => setIsOpen(false)}>Cerrar</button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
