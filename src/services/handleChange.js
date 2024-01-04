export const handleChange = ({ target }, value, setValue) => {
	setValue({ ...value, [target.name]: target.value });
}