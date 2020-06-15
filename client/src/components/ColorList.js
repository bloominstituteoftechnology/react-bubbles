import React, { useState } from 'react';
import uuid from 'uuid/v4';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
	color: '',
	code: { hex: '' },
	id: null,
};

const ColorList = ({ colors, updateColors }) => {
	console.log(colors);
	const [editing, setEditing] = useState(false);
	const [adding, setAdding] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);
	const [colorToAdd, setColorToAdd] = useState(initialColor);

	const editColor = (color) => {
		setEditing(true);
		setAdding(false);
		setColorToEdit(color);
		setColorToAdd(initialColor);
	};

	const addColor = () => {
		setEditing(false);
		setAdding(true);
		setColorToEdit(initialColor);
		setColorToAdd(initialColor);
	};

	const saveColor = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.post(`/colors`, colorToAdd)
			.then((res) => {
				console.log('POST', res);
				setAdding(false);
				updateColors([...colors, { ...colorToAdd, id: uuid() }]);
				setColorToAdd(initialColor);
			})
			.catch((err) => console.error(err));
	};

	const saveEdit = (e) => {
		e.preventDefault();
		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is is saved right now?
		axiosWithAuth()
			.put(`/colors/${colorToEdit.id}`, colorToEdit)
			.then((res) => {
				setEditing(false);
				updateColors(
					colors.map((item) => {
						if (item.id === colorToEdit.id) {
							return { ...colorToEdit };
						}else{
							return { ...item };
						}
						
					})
				);
				setColorToEdit(initialColor);
			})
			.catch((err) => console.error(err));
	};

	const deleteColor = (color) => {
		axiosWithAuth()
			.delete(`/colors/${color.id}`)
			.then((res) => {
				setEditing(false);
				updateColors(colors.filter((item) => item.id !== color.id));
				setColorToEdit(initialColor);
			})
			.catch((err) => console.error(err));
	};

	return (
		<div className="colors-wrap">
			<p>colors</p>
			<ul>
				{colors.map((color, index) => (
					<li key={index} onClick={() => editColor(color)}>
						<span>
							<span
								className="delete"
								onClick={(e) => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>{' '}
							{color.color}
						</span>
						<div
							className="color-box"
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
			</ul>

			<button onClick={() => addColor()}>Add Color</button>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={(e) =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							type="color"
							onChange={(e) =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value },
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}
			{adding && (
				<form onSubmit={saveColor}>
					<legend>add color</legend>
					<label>
						color name:
						<input
							onChange={(e) =>
								setColorToAdd({ ...colorToAdd, color: e.target.value })
							}
							value={colorToAdd.color}
						/>
					</label>
					<label>
						hex code:
						<input
							type="color"
							onChange={(e) =>
								setColorToAdd({
									...colorToAdd,
									code: { hex: e.target.value },
								})
							}
							value={colorToAdd.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">save</button>
						<button onClick={() => setAdding(false)}>cancel</button>
					</div>
				</form>
			)}
			<div className="spacer" />
			{/* stretch - build another form here to add a color */}
		</div>
	);
};

export default ColorList;
 