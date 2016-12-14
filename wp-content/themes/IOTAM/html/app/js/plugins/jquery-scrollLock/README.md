jquery.scrollLock.js
====================

Useful for when a blocking user experience is needed (in my case, didn't want people unwittingly loosing their place by scrolling while a modal required their attention): `$.scrollLock()` locks the body in place, preventing scroll until it is unlocked.

```
// Locks the page if it's currently unlocked
$.scrollLock();

// ...or vice versa
$.scrollLock();

// Locks the page
$.scrollLock( true );

// Unlocks the page
$.scrollLock( false );
```