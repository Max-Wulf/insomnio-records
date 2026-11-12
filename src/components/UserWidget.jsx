/**
 * CONTEXTO: Ícono SVG de usuario. Usa currentColor para heredar el estilo del botón del navbar.
 */
const UserWidget = () => (
  <svg className="pixel-user" viewBox="0 0 24 24" width="32" height="32"
    fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
    <path d="M9 2h6v2h2v6h-2v2H9v-2H7V4h2V2zm0 12h6v2h4v2h2v4H3v-4h2v-2h4v-2z" />
  </svg>
);

export default UserWidget;
