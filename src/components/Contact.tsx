import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import axios from 'axios';
 import { FaWhatsapp } from 'react-icons/fa'; 

interface ContatoFormData {
    nome: string;
    email: string;
    mensagem: string;
}

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState<ContatoFormData>({ 
        nome: '', 
        email: '', 
        mensagem: '' 
    });
    
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const apiURL = import.meta.env.VITE_API_URL;
        
        if (!formData.nome || !formData.email || !formData.mensagem) {
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await axios.post(`${apiURL}/api/contact`, formData);
            
            if (response.status === 201) {
                setStatus('success');
                setFormData({ nome: '', email: '', mensagem: '' }); 
            } else {
                setStatus('error');
                setErrorMessage('Erro ao enviar (Status: ' + response.status + ')');
            }
        } catch (error) {
            console.error('Erro de requisição:', error);
            setStatus('error');
            const msg = axios.isAxiosError(error) && error.response?.data?.error
                ? error.response.data.error
                : 'Ocorreu um erro ao enviar a mensagem.';
            setErrorMessage(msg);
        }
    };

    return (
        <section className="px-4 py-8 flex justify-center" id="contato">
            <div className="bg-[#F5F5F5] rounded-md p-8 shadow-lg md:max-w-4xl">
                <h2 className="text-primary font-medium text-3xl mb-4">Contato</h2>
                <p>Estou sempre aberto a novas oportunidades e conexões. Se você quiser discutir um projeto, uma colaboração ou apenas dizer olá, sinta-se à vontade para me contatar!</p>
                
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="flex flex-col">
                        
                        <label htmlFor="nome">Nome:</label>
                        <input 
                            type="text" 
                            id="nome" 
                            name="nome" 
                            placeholder="Digite seu nome" 
                            className="p-2 border border-surface rounded-md"
                            value={formData.nome}
                            onChange={handleInputChange} 
                            required
                            disabled={status === 'loading'}
                        />
                        
                        <label htmlFor="email" className="mt-4 mb-2 font-medium">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Digite seu melhor email" 
                            className="p-2 border border-surface rounded-md"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            disabled={status === 'loading'}
                        />
                        
                        <label htmlFor="mensagem" className="mt-4 mb-2 font-medium">Mensagem:</label>
                        <textarea 
                            id="mensagem" 
                            name="mensagem" 
                            rows={4} 
                            placeholder="Escreva sua mensagem aqui" 
                            className="p-2 border border-surface rounded-md"
                            value={formData.mensagem}
                            onChange={handleInputChange}
                            required
                            disabled={status === 'loading'}
                        ></textarea>
                        
                        {status === 'success' && <p className="text-green-600 mt-2">✅ Mensagem enviada com sucesso! Logo retornarei o contato.</p>}
                        {status === 'error' && <p className="text-red-600 mt-2">❌ Erro: {errorMessage}</p>}

                        <div className="flex gap-4 items-center mt-4">
                            <button 
                                type="submit" 
                                className="bg-primary cursor-pointer text-white px-6 py-3 rounded-md w-fit disabled:opacity-50"
                                disabled={status === 'loading'} 
                            >
                                {status === 'loading' ? 'Enviando...' : 'Enviar'}
                            </button>
                            <p>Ou</p>
                            <a href="https://wa.me/5512981526683" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#25d366] rounded-full">
                                <span><FaWhatsapp color="white" size={35} /></span>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};
