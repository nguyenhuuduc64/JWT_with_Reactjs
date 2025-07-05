import Main from '../main/Main';
import Header from './../header/Header';
function DefautLayout({ children }) {
    return (
        <div>
            <Header />
            <Main>{children}</Main>
        </div>
    );
}
export default DefautLayout;
