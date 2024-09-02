// next
import { NextApiRequest, NextApiResponse } from 'next';
// utils
import cors from 'src/utils/cors';
import uuidv4 from 'src/utils/uuidv4';
// _mock
import { _board } from 'src/_mock/_kanban';

// ----------------------------------------------------------------------

function getBoard(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    board: _board,
  });
}

// ----------------------------------------------------------------------

function createColumn(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.body;

  const column = {
    id: uuidv4(),
    name,
    taskIds: [],
  };

  _board.columns.push(column);

  _board.ordered.push(column.id);

  res.status(200).json({
    column,
  });
}

// ----------------------------------------------------------------------

function updateColumn(req: NextApiRequest, res: NextApiResponse) {
  const { columnId, newData } = req.body;

  const columnIndex = _board.columns.findIndex((column) => column.id === columnId);

  _board.columns[columnIndex] = {
    ..._board.columns[columnIndex],
    ...newData,
  };

  res.status(200).json({
    column: _board.columns[columnIndex],
  });
}

// ----------------------------------------------------------------------

function deleteColumn(req: NextApiRequest, res: NextApiResponse) {
  const { columnId } = req.body;

  const column = _board.columns.find((column) => column.id === columnId);

  if (column) {
    _board.tasks = _board.tasks.filter((task) => !column.taskIds.includes(task.id));
  }

  _board.columns = _board.columns.filter(({ id }) => id !== `${columnId}`);

  _board.ordered = _board.ordered.filter((id) => id !== columnId);

  res.status(200).json({
    columnId,
  });
}

// ----------------------------------------------------------------------

export default async function allHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await cors(req, res);

    const { endpoint } = req.query;

    switch (req.method) {
      case 'GET':
        getBoard(req, res);
        break;
      case 'POST':
        if (endpoint === 'create') createColumn(req, res);
        if (endpoint === 'update') updateColumn(req, res);
        if (endpoint === 'delete') deleteColumn(req, res);
        break;
      default:
        res.status(405).json({
          message: 'Method not allowed',
        });
    }
  } catch (error) {
    console.error('[Kanban API]: ', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
}
