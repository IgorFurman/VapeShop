import React, { useState, useEffect, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ReactDOM from 'react-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './age-check.css';

export function AgeCheck({ children }) {
	const [birthDate, setBirthDate] = useState(null);
	const [verified, setVerified] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const datePickerRef = useRef(null);

	useEffect(() => {
		let originalStyle;
		if (modalOpen) {
			originalStyle = window.getComputedStyle(document.body).overflow;
			document.body.style.overflow = 'hidden';
			datePickerRef.current.setOpen(true);
		}
		return () => (document.body.style.overflow = originalStyle);
	}, [modalOpen]);

	useEffect(() => {
		if (!localStorage.getItem('ageVerified')) {
			setModalOpen(true);
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const age = calculateAge(birthDate);
		if (age >= 18) {
			setVerified(true);
			localStorage.setItem('ageVerified', 'true');
			setModalOpen(false);
		} else {
			alert('Musisz mieć co najmniej 18 lat, aby korzystać z tej strony');
			window.location.href = 'https://www.google.com';
		}
	};

	const calculateAge = (birthDate) => {
		const ageDiffMs = Date.now() - birthDate.getTime();
		const ageDate = new Date(ageDiffMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	};

	if (modalOpen) {
		return ReactDOM.createPortal(
			<div className='age-check'>
				<form onSubmit={handleSubmit} className='age-check-form'>
					<label >
						Podaj datę swojego urodzenia:
					<div className="age-check-datepicker-container">
          <DatePicker
    ref={datePickerRef}
    selected={birthDate}
    onChange={(date) => setBirthDate(date)}
    dateFormat='dd/MM/yyyy'
    maxDate={new Date()}
    showYearDropdown
    yearDropdownItemNumber={100}
    scrollableYearDropdown
    isClearable
    required
    open={true}
    popperPlacement="bottom"
    popperModifiers={[
        {
            name: "offset",
            options: {
                offset: [0, 2],
            },
        },
    ]}
/>
				</div>
					</label>
					<button className='age-check-submitbtn'type='submit'>Zatwierdź</button>
				</form>
			</div>,
			document.body
		);
	}

	return children;
}
