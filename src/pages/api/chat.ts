import { sub } from 'date-fns';
// next
import { NextApiRequest, NextApiResponse } from 'next';
// utils
import cors from 'src/utils/cors';
import uuidv4 from 'src/utils/uuidv4';
// _mock
import { getData, saveData, _contacts, MY_CONTACT } from 'src/_mock/_chat';

// ----------------------------------------------------------------------

function getConversations(req: NextApiRequest, res: NextApiResponse) {
  const data = getData();

  res.status(200).json({
    conversations: data,
  });
}

// ----------------------------------------------------------------------

function getConversation(req: NextApiRequest, res: NextApiResponse) {
  const { conversationId } = req.query;

  const data = getData();

  const conversation = data.find((conversation) => conversation.id === conversationId);

  if (!conversation) {
    res.status(404).json({
      message: 'Conversation Not Found!',
    });
    return;
  }

  res.status(200).json({
    conversation,
  });
}

// ----------------------------------------------------------------------

function getContacts(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    contacts: _contacts,
  });
}

// ----------------------------------------------------------------------

function getMarkAsSeen(req: NextApiRequest, res: NextApiResponse) {
  const { conversationId } = req.query;

  const data = getData();

  const conversation = data.find((conversation) => conversation.id === conversationId);

  if (!conversation) {
    res.status(404).json({
      message: 'Conversation Not Found!',
    });
    return;
  }

  conversation.unreadCount = 0;

  data.push(conversation);

  saveData(data);

  res.status(200).json({
    status: true,
  });
}

// ----------------------------------------------------------------------

function newConversation(req: NextApiRequest, res: NextApiResponse) {
  const { recipients, body } = req.body;

  const data = getData();

  const participants = [MY_CONTACT, ...recipients];

  const message = {
    id: uuidv4(),
    attachments: [],
    body: `${body}`,
    contentType: 'text',
    createdAt: sub(new Date(), { minutes: 1 }),
    senderId: MY_CONTACT.id,
  };

  const conversation = {
    id: uuidv4(),
    messages: [message],
    participants,
    type: participants.length > 2 ? 'GROUP' : 'ONE_TO_ONE',
    unreadCount: 0,
  };

  data.push(conversation);

  saveData(data);

  res.status(200).json({
    conversation,
  });
}

// ----------------------------------------------------------------------

function updateConversation(req: NextApiRequest, res: NextApiResponse) {
  const { conversationId, body } = req.body;

  const data = getData();

  let conversation;

  if (conversationId) {
    conversation = data.find((conversation) => conversation.id === conversationId);
  }

  if (!conversation) {
    res.status(404).json({
      message: 'Conversation Not Found!',
    });
    return;
  }

  const message = {
    id: uuidv4(),
    attachments: [],
    body: `${body}`,
    contentType: 'text',
    createdAt: sub(new Date(), { minutes: 1 }),
    senderId: MY_CONTACT.id,
  };

  conversation.messages.push(message);

  data.push(conversation);

  saveData(data);

  res.status(200).json({
    conversationId,
    message,
  });
}

// ----------------------------------------------------------------------

export default async function allHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await cors(req, res);

    const { endpoint } = req.query;

    switch (req.method) {
      case 'GET':
        if (endpoint === 'conversations') getConversations(req, res);
        if (endpoint === 'conversation') getConversation(req, res);
        if (endpoint === 'mark-as-seen') getMarkAsSeen(req, res);
        if (endpoint === 'contacts') getContacts(req, res);
        break;
      case 'POST':
        newConversation(req, res);
        break;
      case 'PUT':
        updateConversation(req, res);
        break;
      default:
        res.status(405).json({
          message: 'Method not allowed',
        });
    }
  } catch (error) {
    console.error('[Chat API]: ', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
}
