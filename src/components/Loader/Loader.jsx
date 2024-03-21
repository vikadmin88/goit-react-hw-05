import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
    // #3535c2
    return (
        <ThreeDots
        visible={true}
        height="60"
        width="60"
        color="#3535c2"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    );
};

export default Loader;