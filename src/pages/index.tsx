// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// config
import { HOST_API } from '../config-global';

// ----------------------------------------------------------------------

type BlockProps = {
  path: string;
  method: string;
  endpoint?: string;
  description?: string;
};

export default function IndexPage() {
  const renderHead = (
    <Stack spacing={2} sx={{ textAlign: 'center' }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 'fontWeightBold' }}>
        Punto de entrada del proyecto
      </Typography>

      <Typography variant="body2">
        Host API: <strong>{HOST_API}</strong>
      </Typography>
    </Stack>
  );

  const renderAuth = (
    <Stack spacing={1}>
      <Typography variant="h6" sx={{ fontWeight: 'fontWeightBold' }}>
        Auth
      </Typography>

      <Block method="GET" path="/api/auth/me" description="Get user info after login" />
      <Block method="POST" path="/api/auth/login" description="Login" />
      <Block method="POST" path="/api/auth/register" description="Register" />
    </Stack>
  );

  const renderBlog = (
    <Stack spacing={1}>
      <Typography variant="h6" sx={{ fontWeight: 'fontWeightBold' }}>
        Blog
      </Typography>

      <Block method="GET" path="/api/post/list" description="Get all posts" />
      <Block method="GET" path="/api/post/details" description="Get post details by title" />
      <Block method="GET" path="/api/post/latest" description="Get latest posts" />
      <Block method="GET" path="/api/post/search" description="Search post" />
    </Stack>
  );

  const renderCalendar = (
    <Stack spacing={1}>
      <Typography variant="h6" sx={{ fontWeight: 'fontWeightBold' }}>
        Calendar
      </Typography>

      <Block method="GET" path="/api/calendar" description="Get all events" />
      <Block method="POST" path="/api/calendar" description="Create new event" />
      <Block method="PUT" path="/api/calendar" description="Update event" />
      <Block method="PATCH" path="/api/calendar" description="Delete event" />
    </Stack>
  );

  const renderChat = (
    <Stack spacing={1}>
      <Typography variant="h6" sx={{ fontWeight: 'fontWeightBold' }}>
        Chat
      </Typography>

      <Block
        method="GET"
        path="/api/chat"
        endpoint="conversations"
        description="Get all conversations"
      />
      <Block
        method="GET"
        path="/api/chat"
        endpoint="conversation"
        description="Get conversation details by ID"
      />
      <Block
        method="GET"
        path="/api/chat"
        endpoint="mark-as-seen"
        description="Mark conversation as seen when click"
      />
      <Block method="GET" path="/api/chat" endpoint="contacts" description="Search contacts" />
      <Block method="POST" path="/api/chat" description="Create new conversation" />
      <Block method="PUT" path="/api/chat" description="Update conversation" />
    </Stack>
  );

  const renderKanban = (
    <Stack spacing={1}>
      <Typography variant="h6" sx={{ fontWeight: 'fontWeightBold' }}>
        Kanban
      </Typography>

      <Block method="GET" path="/api/kanban" description="Get Board" />
      <Block method="POST" path="/api/kanban" endpoint="create" description="Create new column" />
      <Block method="POST" path="/api/kanban" endpoint="update" description="Update column" />
      <Block method="POST" path="/api/kanban" endpoint="delete" description="Delete column" />
    </Stack>
  );

  const renderMail = (
    <Stack spacing={1}>
      <Typography variant="h6" sx={{ fontWeight: 'fontWeightBold' }}>
        Mail
      </Typography>

      <Block method="GET" path="/api/mail/list" description="Get all mails" />
      <Block method="GET" path="/api/mail/mails" description="Get mail details by ID" />
      <Block method="GET" path="/api/mail/labels" description="Get all labels" />
    </Stack>
  );

  const renderProduct = (
    <Stack spacing={1}>
      <Typography variant="h6" sx={{ fontWeight: 'fontWeightBold' }}>
        Product
      </Typography>

      <Block method="GET" path="/api/product/list" description="Get all products" />
      <Block method="GET" path="/api/product/details" description="Get product details by ID" />
      <Block method="GET" path="/api/product/search" description="Search product" />
    </Stack>
  );

  return (
    <Container
      maxWidth="md"
      sx={{
        p: 5,
        my: 5,
        borderRadius: 2,
        bgcolor: '#F4F6F8',
        minHeight: '100vh',
        fontFamily: 'fontFamily',
      }}
    >
      <Stack spacing={3}>
        {renderHead}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderAuth}

        {renderBlog}

        {renderCalendar}

        {renderChat}

        {renderKanban}

        {renderMail}

        {renderProduct}
      </Stack>
    </Container>
  );
}

// ----------------------------------------------------------------------

function Block({ method, path, endpoint, description }: BlockProps) {
  const renderDescription = (
    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
      {description}
    </Typography>
  );

  const renderMethod = (
    <Box
      component="span"
      sx={{
        mr: 1,
        px: 0.5,
        py: 0.25,
        borderRadius: 1,
        typography: 'caption',
        color: 'common.white',

        fontWeight: 'fontWeightBold',
        ...(method === 'GET' && {
          bgcolor: 'success.light',
        }),
        ...(method === 'POST' && {
          bgcolor: 'info.light',
        }),
        ...(method === 'PUT' && {
          bgcolor: 'warning.light',
        }),
        ...(method === 'PATCH' && {
          bgcolor: 'error.light',
        }),
      }}
    >
      {method}
    </Box>
  );

  const renderEndpoint = (
    <>
      <Box component="span" sx={{ color: 'text.disabled' }}>
        endpoint:
      </Box>
      <Box component="span" sx={{ color: 'error.main', ml: 0.5 }}>
        {endpoint}
      </Box>
    </>
  );

  const renderPath = <Box component="span" sx={{ flexGrow: 1 }}>{`${HOST_API}${path}`}</Box>;

  return (
    <Stack component={Paper} spacing={1} elevation={0} sx={{ p: 1.5 }}>
      {description && renderDescription}

      <Stack direction="row" alignItems="center">
        {renderMethod}

        {renderPath}

        {endpoint && renderEndpoint}
      </Stack>
    </Stack>
  );
}
