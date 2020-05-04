import React from 'react'
import { useState } from 'react'

const InputGroup = (props) => {
	const [colorsInput, handlerColorInput] = useState('')
	const [colors, handlerColors] = useState(!props.car ? ['Тест', 'Тест 1', 'Тест 2'] : props.car.colors)
	const [modelInput, handlerModelInput] = useState(!props.car ? '' : props.car.name)
	const [typeInput, handlerTypeInput] = useState(!props.car ? '' : props.car.categoryId.name)
	const [error, hanlerError] = useState(false)
	
	
	const setTextColorsValue = (e) => {
		handlerColorInput(e.target.value)
	}
	const changeModelInput = (e) =>{
		handlerModelInput(e.target.value)
	}
	const changeTypeInput = (e) => {
		handlerTypeInput(e.target.value)
		if (typeInput === props.category[0].name & typeInput === props.category[1].name) {
			hanlerError(false)
			console.log('Равно');
		} 
		else
			hanlerError(true)
			console.log('не равно');
	}
	const pushNewColor = () => {
		if (colorsInput !== '' & colorsInput.length < 10) {
			handlerColors([
				...colors,
				colorsInput
			])
			handlerColorInput('')
		}
	}
	const pushOnEnter = (e) => {
		if (e.key === 'Enter' & colorsInput !== '' & colorsInput.length < 10) {
			handlerColors([
				...colors,
				colorsInput
			])
			handlerColorInput('')
		}
	}
	const setChangedCar = () => {
		if (props.car) {
			props.setNewChangedCar(modelInput, typeInput, colors)
			props.saveAuto()	
		}
	}
	const resetChanged = () => {
		handlerColors(props.car.colors)
		handlerColorInput('')
		handlerModelInput(props.car.name)
		handlerTypeInput(props.car.categoryId.name)
	}
	const deleteCar = () => {

	}

	return (
		<>
		<div>
			<div className='sittings-car'>
				<label>
					<span>Модель автомобиля</span>
					<input 
						className='admin-input'
						placeholder='Машина не выбрана' 
						type='text'
						onChange={changeModelInput}
						value={modelInput} 
					/>
				</label>
				<label>
					<span>Тип автомобиля</span>
					<input  
						className={error ? 'admin-input error' : 'admin-input'}
						placeholder='Машина не выбрана' 
						type='text'
						onChange={changeTypeInput}
						value={typeInput}
					/>
					{
						error 
						?	<span className='error-message'>
								Возможные варианты : {props.category[0].name} или {props.category[1].name}
							</span>
						: null
					}
				</label>
			</div>
			<div className='sittings-color'>
				<label>
					<span>Доступные цвета</span>
					<div className='admin-input-wrapper'>
						<input
							className='admin-input'
							type='text'
							placeholder='Введите название цвета'
							value={colorsInput}
							onChange={setTextColorsValue}
							onKeyUp={pushOnEnter}
						/>
						<button onClick={pushNewColor}></button>
					</div>
				</label>
				{
					colors.map(el => {
						return (
							<label 
								key={el} 
								className='admin-checkbox'
							>
								<div>
									<input
										type='checkbox'
										value={el}
										defaultChecked={el}
										// onChange={() => selectColors(el)}
									/>
									<span className='fake-admin'></span>
									<span>{el}</span>
								</div>
							</label>
						)
					})
				}
			</div>
		</div>
		<div className='control-button'>
			<button onClick={setChangedCar} className='admin-btn blue'>Сохранить</button>
			<button onClick={resetChanged} className='admin-btn gray'>Отменить</button>
			<button className='admin-btn red'>Удалить</button>
		</div>
		</>
	)
}

export default InputGroup