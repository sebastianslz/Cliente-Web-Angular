-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-11-2018 a las 07:24:56
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `marelsa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accesos`
--

CREATE TABLE `accesos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `url` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `accesos`
--

INSERT INTO `accesos` (`id`, `nombre`, `url`) VALUES
(1, 'Gestionar Personas', 'administracion/gestionar-personas'),
(2, 'Gestionar Empleados', 'administracion/gestionar-empleados'),
(3, 'Gestionar Clientes', 'administracion/gestionar-clientes'),
(4, 'Gestionar Administradores', 'administracion/gestionar-administradores'),
(5, 'Gestionar Inmueble', 'administracion/gestion-inmuebles'),
(6, 'Gestionar Contrato de venta', 'administracion/asignar-ventas-contratos'),
(7, 'Gestionar Contrato de arriendo', 'administracion/asignar-arriendo-contrato');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivo_inmueble`
--

CREATE TABLE `archivo_inmueble` (
  `id` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `nombre` varchar(300) NOT NULL,
  `inmueble` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `arriendo`
--

CREATE TABLE `arriendo` (
  `id` int(11) NOT NULL,
  `contrato` int(11) NOT NULL,
  `empleado` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `arriendo`
--

INSERT INTO `arriendo` (`id`, `contrato`, `empleado`, `fecha`, `descripcion`) VALUES
(1, 1, 9, '0000-00-00', 'se arrendo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Asesor de ventas', 'es el que cuenta'),
(4, 'Asistente de ventas', 'es el que realiza las visitas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caucion`
--

CREATE TABLE `caucion` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `arriendo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita_desalojo`
--

CREATE TABLE `cita_desalojo` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `arriendo` int(11) NOT NULL,
  `empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `departamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`id`, `nombre`, `departamento`) VALUES
(2, 'Calarca', 1),
(3, 'Circacia', 1),
(4, 'Filandia', 1),
(5, 'Pereira', 2),
(7, 'Dos Quebradas', 2),
(10, 'Salento', 1),
(11, 'Quimabaya', 1),
(12, 'La Tebaida', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato`
--

CREATE TABLE `contrato` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `empleado` int(11) NOT NULL,
  `cliente` int(11) NOT NULL,
  `visita` int(11) NOT NULL,
  `estado` int(11) NOT NULL,
  `valorFinalInmueble` int(11) NOT NULL,
  `fecha_finalizacion` date DEFAULT NULL,
  `fecha_solicitud` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `contrato`
--

INSERT INTO `contrato` (`id`, `descripcion`, `empleado`, `cliente`, `visita`, `estado`, `valorFinalInmueble`, `fecha_finalizacion`, `fecha_solicitud`) VALUES
(1, 'venta de propiedad', 9, 4, 1, 1, 50000000, '2019-11-11', '2018-11-11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--

CREATE TABLE `departamentos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`id`, `nombre`) VALUES
(1, 'Quindio'),
(2, 'Risaralda');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `usuario` int(11) NOT NULL,
  `salario` int(11) NOT NULL,
  `cargo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `experiencias`
--

CREATE TABLE `experiencias` (
  `id` int(11) NOT NULL,
  `empresa` varchar(200) NOT NULL,
  `empresa_direccion` varchar(100) NOT NULL,
  `empresa_telefono` varchar(100) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `file_certificacion` varchar(200) NOT NULL,
  `empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formaciones`
--

CREATE TABLE `formaciones` (
  `id` int(11) NOT NULL,
  `institucion` varchar(100) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `file_certificacion` varchar(300) NOT NULL,
  `empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formato_ventas`
--

CREATE TABLE `formato_ventas` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `inmueble` int(11) NOT NULL,
  `empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informe`
--

CREATE TABLE `informe` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `arriendo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmueble`
--

CREATE TABLE `inmueble` (
  `id` int(11) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `area` int(11) DEFAULT NULL,
  `valor` int(11) DEFAULT NULL,
  `banios` int(11) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `tipoAV` int(11) DEFAULT NULL,
  `garajes` int(11) DEFAULT NULL,
  `habitaciones` int(11) DEFAULT NULL,
  `detalles` varchar(400) DEFAULT NULL,
  `anoconstruccion` varchar(20) DEFAULT NULL,
  `ascensor` char(1) DEFAULT NULL,
  `canchasDepor` char(1) DEFAULT NULL,
  `zonasHumedas` char(1) DEFAULT NULL,
  `zonaInfantil` char(1) DEFAULT NULL,
  `jardines` char(1) DEFAULT NULL,
  `transporteCercano` char(1) NOT NULL,
  `precioNegociable` char(1) NOT NULL,
  `zonaRopas` char(1) DEFAULT NULL,
  `parqueadero` char(1) DEFAULT NULL,
  `deposito` char(1) DEFAULT NULL,
  `estudio` char(1) DEFAULT NULL,
  `tipoCortinas` varchar(100) DEFAULT NULL,
  `cuartoServicio` char(1) DEFAULT NULL,
  `chimenea` char(1) DEFAULT NULL,
  `cocinaAC` char(1) DEFAULT NULL,
  `comedorIndependiente` char(1) DEFAULT NULL,
  `vistaExterior` char(1) DEFAULT NULL,
  `zona` int(11) DEFAULT NULL,
  `numero_matricula` varchar(100) DEFAULT NULL,
  `fechaAprobacion` date DEFAULT NULL,
  `tipo` int(11) DEFAULT NULL,
  `ciudad` int(11) DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `administrador` int(11) DEFAULT NULL,
  `latitud` int(11) DEFAULT NULL,
  `longitud` int(11) DEFAULT NULL,
  `promocion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `inmueble`
--

INSERT INTO `inmueble` (`id`, `direccion`, `area`, `valor`, `banios`, `estado`, `tipoAV`, `garajes`, `habitaciones`, `detalles`, `anoconstruccion`, `ascensor`, `canchasDepor`, `zonasHumedas`, `zonaInfantil`, `jardines`, `transporteCercano`, `precioNegociable`, `zonaRopas`, `parqueadero`, `deposito`, `estudio`, `tipoCortinas`, `cuartoServicio`, `chimenea`, `cocinaAC`, `comedorIndependiente`, `vistaExterior`, `zona`, `numero_matricula`, `fechaAprobacion`, `tipo`, `ciudad`, `usuario`, `administrador`, `latitud`, `longitud`, `promocion`) VALUES
(1, 'calle3', 1, 120000, 1, 1, 1, 1, 1, '1ghghhdfdf', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', '1', '1', ' ', '1', '1', '1', '1', '1', 1, '1', '0000-00-00', 1, 2, 1, NULL, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id` int(11) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id`, `cedula`, `nombre`, `apellido`, `fecha_nacimiento`, `telefono`, `direccion`, `rol`) VALUES
(1, '1090', 'david', 'ramirezz', '1993-12-05', '3178860805', 'cra 15 10 n21', 1),
(2, '1091', 'sebastian', 'salazar', '1992-08-14', '3164898498', 'calle 2 # 12', 1),
(3, '1092', 'alejo', 'sanchez', '1993-10-10', '3167647445', 'CRA 12 N 24', 2),
(4, '1094', 'monica', 'sepulveda', '1994-10-10', '3178745476', 'calle 3', 2),
(5, '1095', 'monica', 'sepulveda', '1994-10-10', '3178745470', 'calle 114 012', 2),
(6, '1096', 'jordy', 'agudeloo', '1995-11-23', '3164898423', 'calle 2 # 15', 1),
(7, '1097', 'david', 'ramirez', '1993-12-05', '3178860', 'cra 15 10 n21', 1),
(8, '1099', 'monica', 'sepulveda', '1994-10-10', '3178745471', 'calle 114 012', 2),
(9, '1100', 'pamela', 'sababria', '1991-11-05', '3124344553', 'cra 19 032', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes_visitas`
--

CREATE TABLE `reportes_visitas` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `inmueble` int(11) NOT NULL,
  `usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reportes_visitas`
--

INSERT INTO `reportes_visitas` (`id`, `fecha`, `inmueble`, `usuario`) VALUES
(1, '0000-00-00', 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservar_visita`
--

CREATE TABLE `reservar_visita` (
  `id` int(11) NOT NULL,
  `mensaje` varchar(600) NOT NULL,
  `fecha` date DEFAULT NULL,
  `estado` int(11) NOT NULL,
  `inmueble` int(11) NOT NULL,
  `cliente` int(11) NOT NULL,
  `empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reservar_visita`
--

INSERT INTO `reservar_visita` (`id`, `mensaje`, `fecha`, `estado`, `inmueble`, `cliente`, `empleado`) VALUES
(1, 'visita de propiedad ', '2018-11-11', 1, 1, 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reunion`
--

CREATE TABLE `reunion` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `persona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Administrador', 'administrador'),
(2, 'Cliente', 'asistente'),
(3, 'Empleado', 'asesor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_accesos`
--

CREATE TABLE `rol_accesos` (
  `rol` int(11) NOT NULL,
  `acceso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rol_accesos`
--

INSERT INTO `rol_accesos` (`rol`, `acceso`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(2, 3),
(2, 5),
(3, 1),
(3, 2),
(3, 3),
(3, 5),
(3, 6),
(3, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_inmueble`
--

CREATE TABLE `tipo_inmueble` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_inmueble`
--

INSERT INTO `tipo_inmueble` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Casa', 'casa'),
(2, 'Apartamento', 'apartamento'),
(3, 'Finca', 'Finca'),
(4, 'Oficina', 'Oficina'),
(5, 'Local comercial', 'Local comercial'),
(6, 'Bodega', 'Bodega'),
(7, 'Chalet', 'Chalet');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `persona` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`persona`, `username`, `password`) VALUES
(1, 'admin', '1234'),
(2, 'sebas', '1234'),
(3, 'moni3', '1234'),
(4, 'moni4', '1234'),
(5, 'moni', '1234'),
(6, 'jordy', '1234'),
(7, 'dav', '1234'),
(8, 'monica2', '1234'),
(9, 'pame', '1234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `id` int(11) NOT NULL,
  `contrato` int(11) NOT NULL,
  `empleado` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `venta`
--

INSERT INTO `venta` (`id`, `contrato`, `empleado`, `fecha`, `descripcion`) VALUES
(1, 1, 9, '2018-10-10', 'se vende');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accesos`
--
ALTER TABLE `accesos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `archivo_inmueble`
--
ALTER TABLE `archivo_inmueble`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fotos_inmueble_inmueble_fk` (`inmueble`);

--
-- Indices de la tabla `arriendo`
--
ALTER TABLE `arriendo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `arriendo_contrato_fk` (`contrato`),
  ADD KEY `empleadov3` (`empleado`);

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `caucion`
--
ALTER TABLE `caucion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `arriendo` (`arriendo`);

--
-- Indices de la tabla `cita_desalojo`
--
ALTER TABLE `cita_desalojo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cita_desalojo_arriendo_fk` (`arriendo`),
  ADD KEY `empleadov5` (`empleado`);

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ciudades_departamentos_fk` (`departamento`);

--
-- Indices de la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD PRIMARY KEY (`id`),
  ADD KEY `personav1` (`empleado`),
  ADD KEY `personav3` (`cliente`),
  ADD KEY `reservar_visita` (`visita`);

--
-- Indices de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`usuario`),
  ADD KEY `empleados_cargos_fk` (`cargo`);

--
-- Indices de la tabla `experiencias`
--
ALTER TABLE `experiencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `experiencias_empleados_fk` (`empleado`);

--
-- Indices de la tabla `formaciones`
--
ALTER TABLE `formaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formaciones_empleados_fk` (`empleado`);

--
-- Indices de la tabla `formato_ventas`
--
ALTER TABLE `formato_ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empleadov6` (`empleado`),
  ADD KEY `inmueble` (`inmueble`);

--
-- Indices de la tabla `informe`
--
ALTER TABLE `informe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `arriendov2` (`arriendo_id`);

--
-- Indices de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `inmueble__un` (`numero_matricula`),
  ADD KEY `inmueble_ciudades_fk` (`ciudad`),
  ADD KEY `inmueble_usuarios_fk` (`usuario`),
  ADD KEY `tipo_inmueble_fk` (`tipo`),
  ADD KEY `inmueble_usuarios_fkv2` (`administrador`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personas__un` (`cedula`),
  ADD KEY `personas_roles_fk` (`rol`);

--
-- Indices de la tabla `reportes_visitas`
--
ALTER TABLE `reportes_visitas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reservar_visita`
--
ALTER TABLE `reservar_visita`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empleado` (`empleado`),
  ADD KEY `res_visita_inm_fk` (`inmueble`),
  ADD KEY `visita_personas_fk` (`cliente`);

--
-- Indices de la tabla `reunion`
--
ALTER TABLE `reunion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `persona` (`persona`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rol_accesos`
--
ALTER TABLE `rol_accesos`
  ADD PRIMARY KEY (`rol`,`acceso`),
  ADD KEY `acceso` (`acceso`);

--
-- Indices de la tabla `tipo_inmueble`
--
ALTER TABLE `tipo_inmueble`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`persona`),
  ADD UNIQUE KEY `usuario__un` (`persona`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contraro` (`contrato`),
  ADD KEY `empleadov2` (`empleado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accesos`
--
ALTER TABLE `accesos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `archivo_inmueble`
--
ALTER TABLE `archivo_inmueble`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `caucion`
--
ALTER TABLE `caucion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cita_desalojo`
--
ALTER TABLE `cita_desalojo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `experiencias`
--
ALTER TABLE `experiencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `formaciones`
--
ALTER TABLE `formaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `formato_ventas`
--
ALTER TABLE `formato_ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `informe`
--
ALTER TABLE `informe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `reportes_visitas`
--
ALTER TABLE `reportes_visitas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `reservar_visita`
--
ALTER TABLE `reservar_visita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `reunion`
--
ALTER TABLE `reunion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_inmueble`
--
ALTER TABLE `tipo_inmueble`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivo_inmueble`
--
ALTER TABLE `archivo_inmueble`
  ADD CONSTRAINT `fotos_inmueble_inmueble_fk` FOREIGN KEY (`inmueble`) REFERENCES `inmueble` (`id`);

--
-- Filtros para la tabla `arriendo`
--
ALTER TABLE `arriendo`
  ADD CONSTRAINT `arriendo_contrato_fk` FOREIGN KEY (`contrato`) REFERENCES `contrato` (`id`),
  ADD CONSTRAINT `empleadov3` FOREIGN KEY (`empleado`) REFERENCES `personas` (`id`);

--
-- Filtros para la tabla `caucion`
--
ALTER TABLE `caucion`
  ADD CONSTRAINT `arriendo` FOREIGN KEY (`arriendo`) REFERENCES `arriendo` (`id`);

--
-- Filtros para la tabla `cita_desalojo`
--
ALTER TABLE `cita_desalojo`
  ADD CONSTRAINT `cita_desalojo_arriendo_fk` FOREIGN KEY (`arriendo`) REFERENCES `arriendo` (`id`),
  ADD CONSTRAINT `empleadov5` FOREIGN KEY (`empleado`) REFERENCES `personas` (`id`);

--
-- Filtros para la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `ciudades_departamentos_fk` FOREIGN KEY (`departamento`) REFERENCES `departamentos` (`id`);

--
-- Filtros para la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD CONSTRAINT `personav1` FOREIGN KEY (`empleado`) REFERENCES `personas` (`id`),
  ADD CONSTRAINT `personav3` FOREIGN KEY (`cliente`) REFERENCES `personas` (`id`),
  ADD CONSTRAINT `reservar_visita` FOREIGN KEY (`visita`) REFERENCES `reservar_visita` (`id`);

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_cargos_fk` FOREIGN KEY (`cargo`) REFERENCES `cargos` (`id`),
  ADD CONSTRAINT `empleados_usuarios_fk` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`persona`);

--
-- Filtros para la tabla `experiencias`
--
ALTER TABLE `experiencias`
  ADD CONSTRAINT `experiencias_empleados_fk` FOREIGN KEY (`empleado`) REFERENCES `empleados` (`usuario`);

--
-- Filtros para la tabla `formaciones`
--
ALTER TABLE `formaciones`
  ADD CONSTRAINT `formaciones_empleados_fk` FOREIGN KEY (`empleado`) REFERENCES `empleados` (`usuario`);

--
-- Filtros para la tabla `formato_ventas`
--
ALTER TABLE `formato_ventas`
  ADD CONSTRAINT `empleadov6` FOREIGN KEY (`empleado`) REFERENCES `personas` (`id`),
  ADD CONSTRAINT `inmueble` FOREIGN KEY (`inmueble`) REFERENCES `inmueble` (`id`);

--
-- Filtros para la tabla `informe`
--
ALTER TABLE `informe`
  ADD CONSTRAINT `arriendov2` FOREIGN KEY (`arriendo_id`) REFERENCES `arriendo` (`id`);

--
-- Filtros para la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD CONSTRAINT `inmueble_ciudades_fk` FOREIGN KEY (`ciudad`) REFERENCES `ciudades` (`id`),
  ADD CONSTRAINT `inmueble_usuarios_fk` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`persona`),
  ADD CONSTRAINT `inmueble_usuarios_fkv2` FOREIGN KEY (`administrador`) REFERENCES `usuarios` (`persona`),
  ADD CONSTRAINT `tipo_inmueble_fk` FOREIGN KEY (`tipo`) REFERENCES `tipo_inmueble` (`id`);

--
-- Filtros para la tabla `personas`
--
ALTER TABLE `personas`
  ADD CONSTRAINT `personas_roles_fk` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`);

--
-- Filtros para la tabla `reservar_visita`
--
ALTER TABLE `reservar_visita`
  ADD CONSTRAINT `empleado` FOREIGN KEY (`empleado`) REFERENCES `personas` (`id`),
  ADD CONSTRAINT `res_visita_inm_fk` FOREIGN KEY (`inmueble`) REFERENCES `inmueble` (`id`),
  ADD CONSTRAINT `visita_personas_fk` FOREIGN KEY (`cliente`) REFERENCES `personas` (`id`);

--
-- Filtros para la tabla `reunion`
--
ALTER TABLE `reunion`
  ADD CONSTRAINT `persona` FOREIGN KEY (`persona`) REFERENCES `personas` (`id`);

--
-- Filtros para la tabla `rol_accesos`
--
ALTER TABLE `rol_accesos`
  ADD CONSTRAINT `acceso` FOREIGN KEY (`acceso`) REFERENCES `accesos` (`id`),
  ADD CONSTRAINT `rol` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuario_personas_fk` FOREIGN KEY (`persona`) REFERENCES `personas` (`id`);

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `contraro` FOREIGN KEY (`contrato`) REFERENCES `contrato` (`id`),
  ADD CONSTRAINT `empleadov2` FOREIGN KEY (`empleado`) REFERENCES `personas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
