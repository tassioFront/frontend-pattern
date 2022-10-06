import { createGlobalStyle } from 'styled-components';
import { reset } from './reset';
import { typography } from './typography';
import { variables } from './variables';
import { globalDefinitions } from './globalDefinitions';

const GlobalStyle = createGlobalStyle`
    ${reset}
    ${variables}
    ${typography}
    ${globalDefinitions}
`;

export default GlobalStyle;
