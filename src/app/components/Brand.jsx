import { Box, styled, Typography } from "@mui/material";
import AppLogo from "./AppLogo";
import useSettings from "app/hooks/useSettings";
import { Span } from "./Typography";
import { Link } from "react-router-dom";
import useAuth from "app/hooks/useAuth";

const BrandRoot = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 18px 20px 59px',
}));

const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 32,
  marginLeft: '0rem',
  display: mode === 'compact' ? 'none' : 'block',
}));

// New styled component for the additional heading
const Heading = styled('h')({
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333', // You can change the color as needed
  marginTop: '1px', // Reduced marginTop to decrease space below the heading
});

const Brand = ({ children }) => {
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;
  const {user} = useAuth();

  return (
    <BrandRoot>
      <Link to={"/home"}>
        <Box display="flex" alignItems="center" flexDirection="column" textAlign="center">
          <img src={"/assets/images/lo.png"} height={80} style={{ objectFit: "cover" }} />
          <StyledSpan mode={mode} className="sidenavHoverShow">
            HMS
          </StyledSpan>
          <Heading>
            {user.role}
          </Heading>
        </Box>
      </Link>

      <Box className="sidenavHoverShow" sx={{ display: mode === 'compact' ? 'none' : 'block' }}>
        {children || null}
      </Box>
    </BrandRoot>
  );
};

export default Brand;
