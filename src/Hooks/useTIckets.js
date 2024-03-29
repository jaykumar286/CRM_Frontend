import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  filterTickets,
  getMyAssignedTickets,
  getMyCreatedTickets,
  resetTicketList} from "../Redux/Slices/TicketSlice";

export default function useTickets() {
  const authState = useSelector((state) => state.auth);
  const ticketState = useSelector((state) => state.tickets);
  const dispatch = useDispatch();
  const [queryParams] = useSearchParams();
  const status = queryParams.get("status");

  function handleTickets() {
    if (ticketState.dowloadedTickets.length == 0) {
      if (authState.role == 'customer'){
        dispatch(getMyCreatedTickets());
      }
      else{
        dispatch(getMyAssignedTickets());
      }
    }
    if (status) {
      dispatch(filterTickets({ status: status }));
    } else {
      dispatch(resetTicketList());
    }
  }

  useEffect(() => {
    handleTickets();
  }, [authState.token, status]);

  return ticketState;
}
