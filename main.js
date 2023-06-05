// SortByNameStrategy class for sorting events by name
class SortByNameStrategy {
  sort(events, asc) {
    if (asc) {
      return events.sort((a, b) => a.description.localeCompare(b.description));
    } else {
      return events.sort((a, b) => b.description.localeCompare(a.description));
    }
  }
}

// SortByDateStrategy class for sorting events by due date
class SortByDateStrategy {
  sort(events, asc) {
    if (asc) {
      return events.sort((a, b) => a.dueDate - b.dueDate);
    } else {
      return events.sort((a, b) => b.dueDate - a.dueDate);
    }
  }
}

// Event class represents a single event in the calendar
class Event {
  constructor(description) {
    this.description = description; // Event description
    this.completed = false; // indicates if the event is completed or not
  }

  // toggleCompletion function toggles the completion status of the event
  toggleCompletion() {
    this.completed = !this.completed;
  }
}

// EventList class represents the list of events in the calendar
class EventList {
  constructor() {
    this.events = []; // array of events
    this.sortStrategy = null; // sort strategy
    this.asc = true; // ascending or descending order
  }

  addEvent(event) {
    this.events.push(event);
  }

  removeEvent(index) {
    this.events.splice(index, 1);
  }

  setSortStrategy(sortStrategy) {
    this.sortStrategy = sortStrategy;
  }

  sortEvents() {
    if (this.sortStrategy) {
      this.events = this.sortStrategy.sort(this.events, this.asc);
    }
  }
}

// DueDateEvent class represents an event with a due date
class DueDateEvent extends Event {
  constructor(description, dueDate) {
    super(description); // calling the constructor of the parent class
    this.dueDate = new Date(dueDate); // due date of the event
  }

  // isOverdue function checks if the event is overdue or not
  isOverdue() {
    const now = new Date();
    return this.dueDate < now && !this.completed;
  }
}

// EventRenderer class is responsible for rendering the list of events in the UI
class EventRenderer {
  constructor(eventList, containerId) {
    this.eventList = eventList; // event list to be rendered
    this.container = document.getElementById(containerId); // container element in the UI
  }

  render() {
    this.eventList.sortEvents(); // sort the events before rendering
    this.container.innerHTML = ''; // clear the container element

    this.eventList.events.forEach((event, index) => {
      const li = document.createElement('li');
      const eventDescription = document.createElement('span');
      eventDescription.textContent = event.description;

      if (event instanceof DueDateEvent) {
        const dueDateText = document.createElement('span');
        dueDateText.textContent = ` (date ${event.dueDate.toLocaleDateString()})`;
        if (event.isOverdue()) {
          dueDateText.style.color = 'red';
        }
        eventDescription.appendChild(dueDateText);
      }

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Șterge';
      deleteBtn.className = 'delete-btn';
      deleteBtn.addEventListener('click', () => {
        this.eventList.removeEvent(index);
        this.render();
      });

      eventDescription.addEventListener('click', () => {
        event.toggleCompletion();
        this.render();
      });

      if (event.completed) {
        eventDescription.style.textDecoration = 'line-through';
      }
      li.appendChild(eventDescription);
      li.appendChild(deleteBtn);
      this.container.appendChild(li);
    });
  }
}

// Creational Design Patterns
// Singleton Pattern
class SingletonEventList {
  constructor() {
    if (!SingletonEventList.instance) {
      this.events = [];
      SingletonEventList.instance = this;
    }
    return SingletonEventList.instance;
  }

  addEvent(event) {
    this.events.push(event);
  }

  removeEvent(index) {
    this.events.splice(index, 1);
  }
}

// Factory Method Pattern
class EventFactory {
  createEvent(description, dueDate) {
    let event;
    if (dueDate) {
      event = new DueDateEvent(description, dueDate);
    } else {
      event = new Event(description);
    }
    return event;
  }
}

// Abstract Factory Pattern
class AbstractEventListFactory {
  createEventList() {}
}

class EventListFactory extends AbstractEventListFactory {
  createEventList() {
    return new EventList();
  }
}

class SingletonEventListFactory extends AbstractEventListFactory {
  createEventList() {
    return new SingletonEventList();
  }
}

// Structural Design Patterns
// Decorator Pattern
class EventWithPriority extends Event {
  constructor(event, priority) {
    super(event.description);
    this.event = event;
    this.priority = priority;
  }

  toggleCompletion() {
    this.event.toggleCompletion();
  }
}

// Adapter Pattern
class LegacyEvent {
  constructor(description) {
    this.description = description;
    this.completed = false;
  }

  complete() {
    this.completed = true;
  }
}

class LegacyEventAdapter extends Event {
  constructor(legacyEvent) {
    super(legacyEvent.description);
    this.legacyEvent = legacyEvent;
  }

  toggleCompletion() {
    this.legacyEvent.complete();
  }
}

// Bridge Pattern
class EventListRenderer {
  constructor(eventList) {
    this.eventList = eventList;
  }
}

class HtmlEventListRenderer extends EventListRenderer {
  render() {
    const ul = document.createElement('ul');
    this.eventList.events.forEach((event) => {
      const li = document.createElement('li');
      li.textContent = event.description;
      ul.appendChild(li);
    });
    return ul;
  }
}

class TextEventListRenderer extends EventListRenderer {
  render() {
    return this.eventList.events.reduce((acc, event) => acc + event.description + '\n', '');
  }
}

// Behavioral Design Patterns
// Observer Pattern
class EventListObserver {
  constructor(eventList) {
    this.eventList = eventList;
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update(this.eventList));
  }
}

class EventListView {
  constructor(eventListObserver) {
    this.eventListObserver = eventListObserver;
    this.eventListObserver.addObserver(this);
  }

  update(eventList) {
    console.log(`Event List View: ${eventList.events.map((event) => event.description).join(', ')}`);
  }
}

// Command Pattern
class EventListCommand {
  constructor(eventList) {
    this.eventList = eventList;
    this.commands = [];
  }

  addEvent(event) {
    this.commands.push(() => this.eventList.addEvent(event));
  }

  removeEvent(index) {
    this.commands.push(() => this.eventList.removeEvent(index));
  }

  execute() {
    this.commands.forEach((command) => command());
  }
}

class EventFacade {
  constructor(eventList) {
    this.eventList = eventList;
    this.eventRenderer = new EventRenderer(eventList, 'eventList');
  }

  addEvent() {
    const eventFactory = new EventFactory();
    const eventInput = document.getElementById('eventInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const eventDescription = eventInput.value.trim();
    const dueDateValue = dueDateInput.value;

    if (eventDescription) {
      const event = eventFactory.createEvent(eventDescription, dueDateValue);
      eventList.addEvent(event); // add the new event to the event list
      eventRenderer.render(); // render the updated event list in the UI
      eventInput.value = ''; // clear the event input field
      dueDateInput.value = ''; // clear the due date input field
    }
  }


  sortByName() {
    const sortByNameStrategy = new SortByNameStrategy();
    eventList.asc = !eventList.asc
    eventList.setSortStrategy(sortByNameStrategy);
    eventList.sortEvents();
    eventRenderer.render(); // render the updated event list in the UI
  }

  sortByDate() {
    const sortByDateStrategy = new SortByDateStrategy();
    eventList.asc = !eventList.asc
    this.eventList.setSortStrategy(sortByDateStrategy);
    this.eventList.sortEvents();
    this.eventRenderer.render();
  }
}

document.getElementById('dueDateInput').valueAsDate = new Date();

// create a new event list and event renderer objects
const eventList = new EventList();
const eventRenderer = new EventRenderer(eventList, 'eventList');

const eventFacade = new EventFacade(eventList);
document.getElementById('addEvent').addEventListener('click', () => {
  eventFacade.addEvent()
});

document.getElementById('sortByName').addEventListener('click', () => {
  eventFacade.sortByName()
});

document.getElementById('sortByDate').addEventListener('click', () => {
  eventFacade.sortByDate()
});

// render the event list
eventRenderer.render();

