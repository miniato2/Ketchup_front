import '../../style.css';

const ButtonGroup = ({ buttons }) => {
    return (
        <>
            <div className="btn-group">
                {buttons.map((button, index) => (
                    <button type="button" className={`${button.styleClass}-btn`} key={index} onClick={button.onClick}>{button.label}</button>
                ))}
            </div>
        </>
    );
};
export default ButtonGroup;