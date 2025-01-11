import './DeclarationPage.css';
import Scrollable from '../Scrollable/Scrollable';
import {useNavigate} from "react-router-dom";

export default function DeclarationPage({ isLandscape }) {
  const navigate = useNavigate()
  return (
    <div className="declaration-page">
      <div className="declaration-page-content">
        <div className="declaration-page-title">
          <span className="declaration-page-title__heading">星河·探月作品博物馆宣言</span>
          <span className="declaration-page-title__subheading">Museum Declaration</span>
        </div>
        <Scrollable direction={isLandscape ? 'y' : 'x'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum, eros a accumsan maximus, magna eros pellentesque velit, a fringilla felis felis sit amet erat. Curabitur vel cursus velit. Sed mauris turpis, pellentesque eget commodo sed, rutrum ac elit. Fusce sagittis bibendum augue, eu rhoncus diam scelerisque non. Aenean lobortis tellus eu ligula sollicitudin scelerisque. Vivamus quis efficitur nibh, in tincidunt magna. Nulla sed nisi a justo hendrerit bibendum. Pellentesque luctus efficitur tellus sed porta. Praesent pulvinar sagittis odio quis ultricies.
          <br /><br />
          Aenean suscipit, nibh eu pretium porta, enim ex viverra sem, id tempor urna libero vitae risus. Cras id libero non nisl rutrum posuere. Donec a convallis sapien. Nunc vitae ligula vehicula nunc tristique mattis ut lobortis ex. Donec nisi sapien, vehicula quis efficitur id, pharetra eget neque. Maecenas at erat nulla. Cras eget placerat lacus. Duis quis facilisis dolor. Suspendisse nec ornare est, at cursus ante. Aliquam vitae consectetur velit, at fringilla augue. Etiam egestas justo nibh, ut volutpat arcu tempor et. Duis fringilla vehicula lorem, ut porttitor dui laoreet ultrices.
        </Scrollable>
      </div>
      <img className="declaration-page-about-button" src={'/sign/about-icon.svg'} alt="" onClick={_ => console.log("Clicked about")} />
      <img className="declaration-page-back-button" src={'/sign/back-icon.svg'} alt="" onClick={_ => navigate('/home-page')} />
      <div className="declaration-page-continue-button" onClick={_ => navigate('/catalog')}>继 续 观 览  &gt;</div>
    </div>
  );
}