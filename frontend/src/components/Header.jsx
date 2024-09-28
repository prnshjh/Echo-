import { Button, Flex, Link, useColorMode, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { MdChat, MdOutlineSettings, MdOutlineWbSunny, MdSearch } from "react-icons/md";
import { GiMoon } from "react-icons/gi";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // Import useNavigate
import userAtom from "../atoms/userAtom";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import { useState } from "react"; // Import useState

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const navigate = useNavigate(); // Initialize navigate
  const [searchText, setSearchText] = useState(""); // State for search input

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/${searchText.trim()}`); // Navigate to the user profile page
      setSearchText(""); // Clear the search input after navigation
    }
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }} // Stack items in a column on small screens
      justifyContent="space-between"
      alignItems="center"
      mt={6}
      mb={12}
      px={4} // Add padding for smaller screens
    >
      {user && (
        <Link as={RouterLink} to="/">
          <AiFillHome size={24} />
        </Link>
      )}

      <form onSubmit={handleSearch}> {/* Wrap InputGroup in a form */}
        <InputGroup maxW={{ base: "100%", md: "400px" }} mx="auto" mt={{ base: 2, md: 0 }}>
          <Input 
            placeholder="Search users..." 
            value={searchText} // Bind value to searchText state
            onChange={(e) => setSearchText(e.target.value)} // Update state on input change
          />
          <InputRightElement>
            <MdSearch size={20} />
          </InputRightElement>
        </InputGroup>
      </form>

      {user && (
        <Flex alignItems="center" gap={4}>
          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
          <Link as={RouterLink} to={`/chat`}>
            <MdChat size={20} />
          </Link>
          <Link as={RouterLink} to={`/settings`}>
            <MdOutlineSettings size={20} />
          </Link>

          <Button size="xs" onClick={toggleColorMode} aria-label="Toggle Dark Mode">
            {colorMode === "dark" ? <GiMoon size={20} /> : <MdOutlineWbSunny size={20} />}
          </Button>

          <Button size="xs" onClick={logout}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}

      {!user && (
        <Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("signup")}>
          Sign up
        </Link>
      )}
    </Flex>
  );
};

export default Header;
