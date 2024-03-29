import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';

import "./contactForm.css";

const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isMailSent, setIsMailSent] = useState(false);
  const [isError, setIsError] = useState(false);

  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

        // Vérifier si tous les champs requis sont remplis
        if (!formData.firstname || !formData.lastname || !formData.email || !formData.message) {
          setIsError(true);
          return; // Ne pas envoyer le formulaire si des champs requis sont manquants
        }

    try {
    await axios.post(process.env.REACT_APP_CONTACTFORM, formData);

      // console.log('Réponse du serveur:', response.data);



        // Fermer le formulaire après un court délai 
        setTimeout(() => {
          onClose();
        }, 3000);

            // Afficher le message de succès
            setIsMailSent(true);

    // Réinitialiser le formulaire
    setTimeout(() => {
      setIsMailSent(false);
      setIsError(false);
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 3000);
    } catch (error) {
      console.error('Erreur lors de la requête:', error.message);
    }
  };

  const handleClickOutside = useCallback((e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      onClose();
    }
  }, [onClose, formRef]);
  
  useEffect(() => {
    // Ajouter un gestionnaire d'événements au niveau de la fenêtre pour détecter les clics en dehors du formulaire
    window.addEventListener('mousedown', handleClickOutside);
  
    // Nettoyer le gestionnaire d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    // Faire défiler la page pour que le formulaire soit visible à l'ouverture
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);
  

  return (
    <div className='contact-form-container-root'>
      <div className='contact-form-container'
      ref={formRef}>
   
        <form onSubmit={handleSubmit}>
        <button 
      className='close-button'
      onClick={onClose}>X</button>
          <div className='contact-form-fields'>
          {isMailSent ? (
              <div className='success-message'>
                <p>Votre mail a bien été envoyé !</p>
              </div>
            ) : isError ? (
              <div className='error-message'>
                <p>Merci de remplir au moins les champs suivants : prénom - nom - Email - message</p>
              </div>
            ) : null}
            <div className='contact-form-field'>
              <label>
                Prénom:
                <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
              </label>
            </div>
            <div className='contact-form-field'>
              <label>
                Nom:
                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
              </label>
            </div>
            <div className='contact-form-field'>
              <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </label>
            </div>
            <div className='contact-form-field'>
              <label>
                Sujet:
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
              </label>
            </div>
            <div className='contact-form-field'>
              <label>
                Message:
                <textarea name="message" value={formData.message} onChange={handleChange} />
              </label>
              
            </div>
            
          </div>

          <button className='contact-form-button' type="submit">Envoyer</button>
        </form>

      </div>
    </div>
  );
};

export default ContactForm;
