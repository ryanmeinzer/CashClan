# CashClan QA

1 - seller unpublishes after match
	a - transaction deleted
	b - seller’s offer is unpublished
	c - buyer’s offer remains published
	d - both parties received sms
	e - both parties' screens refresh accordingly if leaving then returning to app/page

2 - buyer unpublishes after match
	a - transaction deleted
	b - buyer’s offer is unpublished
	c - seller’s offer remains published
	d - both parties received sms
	e - both parties' screens refresh accordingly if leaving then returning to app/page

3 - seller confirms transaction
	a - transaction complete
	b - seller’s offer is unpublished
	c - buyer’s offer is unpublished
	d - both parties' screens refresh accordingly if leaving then returning to app/page

4 - buyer confirms transaction
	a - transaction complete
	b - buyer’s offer is unpublished
	c - seller’s offer is unpublished
	d - both parties' screens refresh accordingly if leaving then returning to app/page

5 - seller is matched
	a - transaction created
	b - another seller’s would-be matching offer is not created
	c - another seller’s would-be matching offer does not override 

6 - buyer is matched
	a - transaction created
	b - another buyer’s would-be matching offer is not created
	c - another buyer’s would-be matching offer does not override 