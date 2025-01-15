import LoaderComponent, { LoaderSize, LoaderVariant } from "./LoaderComponent";

const ScreenLoaderComponent = () => {
    return (
        <LoaderComponent variant={LoaderVariant.Secondary} size={LoaderSize.Large} />
    );
};

export default ScreenLoaderComponent;