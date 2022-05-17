import React from "react";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faChartGantt,
  faTransgender,
  faNewspaper,
  faTools,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { NavLink, Nav } from "reactstrap";
import SubMenu from "./SubMenu";
import {NavItem} from "reactstrap"

const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen }, "Parents")}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Hydro Adminka</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <NavItem className="pl-4">
          <NavLink tag={Link} to={'/headerFooter'}>
            Asosiy
          </NavLink>
        </NavItem>
        <SubMenu title="Uy" icon={faHome} items={submenus[0]} />
        <SubMenu title="Haqida" icon={faBriefcase} items={submenus[2]} />
        <SubMenu title="Iqtisodiy" icon={faChartGantt} items={submenus[1]} />
        <SubMenu title="Korporativ" icon={faBriefcase} items={submenus[3]} />
        <SubMenu title="Faoliyatlar" icon={faTransgender} items={submenus[4]} />
        <SubMenu
          title="Texnik imkoniyatlar"
          icon={faTools}
          items={submenus[5]}
        />
        <SubMenu title="Yangiliklar" icon={faNewspaper} items={submenus[6]} />
        <NavLink tag={Link} to={"mainPartners"}>
          <FontAwesomeIcon icon={faPeopleArrows} className="mr-2" />
          Hamkorlar
        </NavLink>
        <SubMenu title="Bog`lanish" icon={faPaperPlane} items={submenus[7]} />
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "Bosh Sahifa",
      target: "home",
    },
    {
      title: "Uy 2",
      target: "Home-2",
    },
    {
      title: "Uy | Haqida",
      target: "Home-about",
    },
    {
      title: "Uy | Bizning ish",
      target: "Home-our-work",
    },
    {
      title: "Uy  | Loyiha raqamlari",
      target: "Home-project-numbers",
    },
    {
      title: "Uy | Hudud",
      target: "Home-region",
    },
  ],
  [
    {
      title: "Sarlavha",
      target: "economic",
    },
    {
      title: "Shartnomalar",
      target: "agreements",
    },
    {
      title: "Diagramma",
      target: "chart",
    },
    {
      title: "Ochiq Muloqot",
      target: "openSourses",
    },
  ],
  [
    {
      title: "Sarlavha",
      target: "aboutHeader",
    },
    {
      title: "Tashkilot tarixi",
      target: "organizationHistory ",
    },
    {
      title: "Kopaniya haqida",
      target: "aboutCompany",
    },
    {
      title: "Suhbatlar",
      target: "meeting",
    },
    {
      title: "Boshqaruv tuzilmasi",
      target: "teamMembers",
    },
  ],
  [
    {
      title: "Asosiy",
      target: "corporativeHeader",
    },
  ],
  [
    {
      title: "Sarlavha",
      target: "activitiesHeader",
    },
    {
      title: "Faoliyatlar",
      target: "activities",
    },
  ],
  [
    {
      title: "Sarlavha",
      target: "technical",
    },
    {
      title: "Video Url Youtube",
      target: "videoUrlYoutube",
    },
    {
      title: "Texnik mashinalar",
      target: "technicalMachine",
    },
    {
      title: "Technik statistika",
      target: "statistics",
    },
  ],
  [
    {
      title: "Sarlavha",
      target: "news",
    },
    {
      title: "Asosiy Yangiliklar",
      target: "mainNews",
    },
  ],
  [
    {
      title: "Sarlavha",
      target: "contact",
    },
    {
      title: "Izohlar",
      target: "comments",
    },
  ],
];

export default SideBar;
