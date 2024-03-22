import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
    // #3535c2
    return (
        <ThreeDots
        visible={true}
        height="120"
        width="120"
        color="#fff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    );
};

export default Loader;